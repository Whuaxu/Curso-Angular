import { HttpClient } from '@angular/common/http';
import  { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '@enviroments/environment';

import type { GiphyResponse } from '../interfaces/giphy';
import { Gif } from '../interfaces/gif';
import { GifMapper } from '../mapper/gif';


const LoadFromLocalStorage = ()  => {
    const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}';
    const gifs = JSON.parse( gifsFromLocalStorage );

    return gifs;
}

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);  
    trendingLoading = signal<boolean>(true);

    searchHistory = signal<Record<string, Gif[]>>( LoadFromLocalStorage() );
    searchHistoryKeys = computed( () => Object.keys( this.searchHistory() ) );

    constructor() {
        this.loadTrendingGifs();
    }


    saveGifsToLocalStorage = effect(() => {
        localStorage.setItem('gifs', JSON.stringify( this.searchHistory() ) );
    });


    loadTrendingGifs() {

        this.http.get<GiphyResponse>( `${environment.giphyURL}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: '20',
            }
        }).subscribe( (resp) => {
            
            const gifs = GifMapper.toGifArray( resp.data );
            this.trendingGifs.set( gifs );
            this.trendingLoading.set( false );
            console.log(gifs);
        });
    }

    searchGifs( query: string ) : Observable<Gif[]> {

        return this.http.get<GiphyResponse>( `${environment.giphyURL}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                q: query,
                limit: '20',
            }
        }).pipe(
            map( ({data}) => data),
            map((items) => GifMapper.toGifArray( items )),
            tap( (items) => {
                this.searchHistory.update( history => ({
                    ...history,
                    [query.toLowerCase()]: items,
                }) );
            })
        );

    }

    getHistoryGifs( query: string ): Gif[] {
        return this.searchHistory()[query] ?? [];
    }

}
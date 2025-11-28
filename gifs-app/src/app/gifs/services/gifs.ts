import { HttpClient } from '@angular/common/http';
import  { computed, inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';

import { environment } from '@enviroments/environment';

import type { GiphyResponse } from '../interfaces/giphy';
import { Gif } from '../interfaces/gif';
import { GifMapper } from '../mapper/gif';


@Injectable({
    providedIn: 'root'
})
export class GifsService {

    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);  
    trendingLoading = signal<boolean>(true);

    searchHistory = signal<Record<string, Gif[]>>({});
    searchHistoryKeys = computed( () => Object.keys( this.searchHistory() ) );

    constructor() {
        this.loadTrendingGifs();
     }

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

    searchGifs( query: string ) {

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


        // }).subscribe( (resp) => {
            
        //     const gifs = GifMapper.toGifArray( resp.data );
        //     console.log({ search: gifs});
        // });
    }

}
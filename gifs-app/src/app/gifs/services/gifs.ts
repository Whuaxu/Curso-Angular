import { HttpClient } from '@angular/common/http';
import  { inject, Injectable, signal } from '@angular/core';
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

}
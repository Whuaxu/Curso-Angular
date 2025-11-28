import { Gif } from "../interfaces/gif";
import { GiphyItem } from "../interfaces/giphy";

export class GifMapper {
    
    static toGif( item: GiphyItem ): Gif {

        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url,
        };
    }

    static toGifArray( items: GiphyItem[] ): Gif[] {
        return items.map( this.toGif );
    }
}
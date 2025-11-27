import { effect, Injectable, signal} from '@angular/core';
import { Character } from '../../interfaces/character';

const loadFromLocalStorage = (): Character[] => {

    const characters = localStorage.getItem('dragonball_characters');

    return characters ? JSON.parse(characters) : [];
} 


@Injectable({providedIn: 'root'})
export class dragonballService {

    characters = signal<Character[]>(loadFromLocalStorage());
    
    saveToLocalStorage = effect(() => {
        console.log(`Character count ${this.characters().length}`);

        localStorage.setItem('dragonball_characters', JSON.stringify(this.characters()));
    });

    addCharacter(character: Character) {

        this.characters.update((characters) => [...characters, character]);
    
    }
}
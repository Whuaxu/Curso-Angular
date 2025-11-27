import { Component } from '@angular/core';
import { signal, computed, output } from '@angular/core';
import type { Character } from '../../../../interfaces/character';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.html',

})

export class CharacterAdd {

  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  characters = signal<Character[]>([
      { id: 1, name: 'Goku', power: 9001 },
      { id: 2, name: 'Vegeta', power: 8500 },

  ]);

  powerClasses = computed(() => {
      return {
          'text-danger': true,
      };
  });

  addCharacter() {

      if (!this.name() || !this.power() || this.power() <= 0) {
          return
      }
      
      const newCharacter: Character = {
        //   id: this.characters().length + 1,
          id: Math.floor(Math.random() * 10000),
          name: this.name(),
          power: this.power(),
      };

      this.characters.update(characters => [...characters, newCharacter]);

      this.name.set('');
      this.power.set(0);
      this.newCharacter.emit(newCharacter);
    }
 }

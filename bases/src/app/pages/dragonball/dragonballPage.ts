import { Component, signal, computed} from "@angular/core";

interface Character {
    id : number;
    name: string;
    power: number;
}

@Component({

    templateUrl: './dragonballPage.html',
})

export class dragonballPage {

    name = signal('Gohan');
    power = signal(100);

    characters = signal<Character[]>([
        { id: 1, name: 'Goku', power: 9001 },
        // { id: 2, name: 'Vegeta', power: 8500 },
        // { id: 3, name: 'Piccolo', power: 4000 },
        // { id: 4, name: 'Alonso', power: 1000 },
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
            id: this.characters().length + 1,
            name: this.name(),
            power: this.power(),
        };

        this.characters.update(characters => [...characters, newCharacter]);

        this.name.set('');
        this.power.set(0);
    }
        
}
import { UpperCasePipe } from "@angular/common";
import { Component, signal, computed} from "@angular/core";

@Component({

    templateUrl: './heroPage.html',
    imports: [UpperCasePipe],
})

export class HeroPage {

    name = signal("Ironman");
    age = signal(45)

    heroDescription = computed (() => {
        return `${ this.name() } - ${ this.age() }`;
    });

    capitalizedHeroName = computed(() => {
        return this.name().toUpperCase();
    });

    getHeroDescription(){
        return `${ this.name() } - ${ this.age() }`;
    }

    changeHero(){

        this.name.set("Spiderman");
        this.age.set(22);
        
        return `${ this.name() } - ${ this.age() }`;
    }

    resetForm(){

        this.name.set("Ironman");
        this.age.set(45);
        
        return `${ this.name() } - ${ this.age() }`;
    }

    changeAge(){
        this.age.set(60);
        
        return `${ this.age() }`;
    }
}
import { Component, signal} from "@angular/core";

@Component({

    templateUrl: './counterPage.html',
    styles: `
        button {
            padding: 5px;
            margin: 5px 10px;
            width: 75px;

        }
    `,
})

export class CounterPage {

    constructor() {
        setInterval(() => {
            this.counterSignal.update((v) => v+1)

            console.log("Tick")
        }, 2);
    }

    counter = 13
    counterSignal = signal(10);

    increaseBy(value: number){
        this.counter += value;
        this.counterSignal.update((current) => current + value);
    }

    resetCounter(){
        this.counter = 1;
        this.counterSignal.set(0);
    }
}
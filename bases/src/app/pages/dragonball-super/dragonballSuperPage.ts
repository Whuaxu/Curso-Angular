import { Component, signal, computed, inject} from "@angular/core";
import { CharacterList } from "../components/dragonball/character-list/character-list";
import { CharacterAdd } from "../components/dragonball/character-add/character-add";
import { dragonballService } from "../services/dragonballService";

@Component({

    templateUrl: './dragonballSuperPage.html',
    selector: 'dragonball-super',
    imports: [CharacterList, CharacterAdd]
})

export class dragonballSuperPage {

    public dragonballService = inject(dragonballService);
 
}
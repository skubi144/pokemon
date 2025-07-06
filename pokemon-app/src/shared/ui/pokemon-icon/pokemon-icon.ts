import {Component, Input} from '@angular/core';
import {PokemonType} from '../../../data-access/model/pokemonType';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-pokemon-icon',
  imports: [
    NzIconDirective
  ],
  templateUrl: './pokemon-icon.html',
  styleUrl: './pokemon-icon.css'
})
export class PokemonIcon {
  @Input({required: true}) name!: PokemonType;
}

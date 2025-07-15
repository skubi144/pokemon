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
  @Input({transform: (value: string): PokemonType => value as PokemonType, required: true}) name!: PokemonType;
}

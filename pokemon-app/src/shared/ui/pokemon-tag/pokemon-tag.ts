import {Component, Input} from '@angular/core';
import {PokemonIcon} from '../pokemon-icon/pokemon-icon';
import {PokemonType} from '../../../data-access/model/pokemonType';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-pokemon-tag',
  imports: [
    PokemonIcon,
    NgClass
  ],
  templateUrl: './pokemon-tag.html',
  styleUrl: './pokemon-tag.css'
})
export class PokemonTag {
  @Input({required: true}) name!: PokemonType;

}

import {Component, Input} from '@angular/core';
import {PokemonDetail} from '../../../data-access/model/pokemonDetail';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css'
})
export class PokemonCard {
  @Input({required:true}) pokemon!: PokemonDetail;

}

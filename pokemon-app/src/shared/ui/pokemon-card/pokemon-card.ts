import {Component, Input} from '@angular/core';
import {PokemonDetail} from '../../../data-access/model/pokemonDetail';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzFlexDirective} from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    NzTypographyComponent,
    UpperCasePipe,
    NzIconDirective,
    NzFlexDirective,
    NgForOf,
    NgIf
  ],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css'
})
export class PokemonCard {
  @Input({required: true}) pokemon!: PokemonDetail;

}

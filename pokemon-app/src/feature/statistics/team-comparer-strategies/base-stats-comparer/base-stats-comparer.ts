import {Component, Input} from '@angular/core';
import {PokemonTeam} from '../../../../data-access/model';

@Component({
  selector: 'app-base-stats-comparer',
  imports: [],
  templateUrl: './base-stats-comparer.html',
  styleUrl: './base-stats-comparer.css'
})
export class BaseStatsComparer {
  @Input() team1!: PokemonTeam;
  @Input() team2!: PokemonTeam;

}

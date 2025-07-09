import {Component, OnInit} from '@angular/core';
import {PokemonTeamService} from '../../../data-access/services/pokemon-team-service';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {PokemonTeam} from '../../../data-access/model/pokemon-team';
import {Subscription} from 'rxjs';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {LoadingService} from '../../../data-access/services/loading-service';
import {PokemonList} from '../pokemon-list/pokemon-list';
import {PokemonIcon} from '../../../shared/ui/pokemon-icon/pokemon-icon';
import {PokemonType} from '../../../data-access/model/pokemonType';
import {PokemonTag} from '../../../shared/ui/pokemon-tag/pokemon-tag';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-team-list',
  imports: [
    NzTableComponent,
    NzFlexDirective,
    NzIconDirective,
    NzButtonComponent,
    NzDividerComponent,
    PokemonTag,
    RouterLink
  ],
  templateUrl: './team-list.html',
  styleUrl: './team-list.css'
})
export class TeamList implements OnInit {
  pokemonTeams: PokemonTeam[] = [];
  pokemonTeamListSubscription!: Subscription;

  constructor(private pokemonTeamService: PokemonTeamService, protected loadingService: LoadingService) {
  }

  ngOnInit() {
    this.pokemonTeamListSubscription = this.pokemonTeamService.getTeams().subscribe({
      next: data => {
        this.pokemonTeams = data
      }
    });
  }

  protected readonly PokemonType = PokemonType;
}

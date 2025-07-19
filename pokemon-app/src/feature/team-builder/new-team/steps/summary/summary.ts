import {Component, OnInit} from '@angular/core';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {PokemonList} from '../../../pokemon-list/pokemon-list';
import {TeamBuilderService} from '../../service/team-builder-service';
import {NewTeamFormGroup} from '../common/form';
import {BerryMatchChart} from '../../components/berry-match-chart/berry-match-chart';
import {TeamTypeTreeMap} from '../../components/team-type-tree-map/team-type-tree-map';
import {NzCollapseComponent, NzCollapsePanelComponent} from 'ng-zorro-antd/collapse';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router, RouterLink} from '@angular/router';
import {PokemonTeamService} from '../../../../../data-access/services/pokemon-team-service';
import {getPokemonTypeCounts} from '../../utils';
import {catchError, forkJoin, map, of, switchMap} from 'rxjs';
import {PokemonDetail, PokemonType} from '../../../../../data-access/model';
import {PokemonService} from '../../../../../data-access/services/pokemon-service';
import {LoadingService} from '../../../../../data-access/services/loading-service';
import {Spinner} from '../../../../../shared/ui/spinner/spinner';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [
    NzFlexDirective,
    PokemonList,
    BerryMatchChart,
    TeamTypeTreeMap,
    NzPageHeaderComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzButtonComponent,
    RouterLink,
    Spinner,
    NgIf
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.css'
})
export class Summary implements OnInit {
  formGroup!: NewTeamFormGroup;

  constructor(private router: Router, protected loadingService: LoadingService, private teamBuildingService: TeamBuilderService, private pokemonTeamService: PokemonTeamService, private pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.formGroup = this.teamBuildingService.formGroup;
  }

  getPokemons(): string[] {
    return this.formGroup.get('pokemons')?.get('selectedId')?.value ?? []
  }

  getTeamName(): string {
    return this.formGroup.get('base')?.get('name')?.value ?? ''
  }

  getBerryNames(): string[] {
    return this.formGroup.get('berries')?.get('selectedId')?.value ?? []
  }

  handleAddNewTeam(): void {
    const data = this.formGroup.value;
    const pokemonIds = data.pokemons?.selectedId ?? [];

    const requests = pokemonIds.map(id => this.pokemonService.getPokemon(id));

    forkJoin(requests).pipe(
      map((pokemons: PokemonDetail[]) => {
        return getPokemonTypeCounts(pokemons).map(typeInfo => typeInfo.name);
      }),
      switchMap(tags => {
        return this.pokemonTeamService.addTeam({
          name: data.base!.name!,
          pokemons: pokemonIds,
          potions: data.potions!.selectedId!,
          berries: data.berries!.selectedId!,
          tags: tags as PokemonType[]
        });
      }),
      catchError(() => of(null))
    ).subscribe(result => {
      if (result) {
        this.router.navigate(['/team-builder']);
      }
    });
  }
}

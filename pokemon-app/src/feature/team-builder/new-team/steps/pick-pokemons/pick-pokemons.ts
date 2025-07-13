import {Component, DestroyRef, OnInit} from '@angular/core';
import {PokemonList} from '../../../../pokedex/pokemon-list/pokemon-list';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {Router, RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {PickItemsFormGroup} from '../common/form';
import {TeamBuilderService} from '../../service/team-builder-service';
import {ReactiveFormsModule} from '@angular/forms';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormItemComponent} from 'ng-zorro-antd/form';
import {LoadingService} from '../../../../../data-access/services/loading-service';
import {AbstractPickItemsComponent} from '../common/abstract-pick-items';
import {Color, NumberCardModule, ScaleType} from '@swimlane/ngx-charts';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {forkJoin, map} from 'rxjs';
import {PokemonService} from '../../../../../data-access/services/pokemon-service';

const INITIAL_STATS = [
  {
    "name": "hp",
    "value": 0
  },
  {
    "name": "attack",
    "value": 0
  },
  {
    "name": "special-attack",
    "value": 0
  },
  {
    "name": "defense",
    "value": 0
  },
  {
    "name": "special-defense",
    "value": 0
  },
  {
    "name": "speed",
    "value": 0
  }
]

@Component({
  selector: 'app-pick-pokemons',
  imports: [
    PokemonList,
    NzFlexDirective,
    RouterLink,
    NzButtonComponent,
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzRowDirective,
    NumberCardModule,
  ],
  templateUrl: './pick-pokemons.html',
  styleUrl: './pick-pokemons.css'
})
export class PickPokemons extends AbstractPickItemsComponent {
  constructor(protected override destroyRef: DestroyRef,
              protected loadingService: LoadingService,
              private teamBuilderService: TeamBuilderService,
              private pokemonService: PokemonService,
              private router: Router) {
    super(destroyRef);
  }

  colorScheme: Color = {
    name: 'ng-zorro-compatible',
    selectable: false,
    group: ScaleType.Quantile,
    domain: [
      '#52c41a',
      '#f5222d',
      '#e1122e',
      '#1890ff',
      '#faad14',
      '#722ed1',
      '#13c2c2',
    ]
  };
  cardColor: string = '#f0f2f5';
  currentStats: any[] = INITIAL_STATS;

  override getFormGroup(): PickItemsFormGroup {
    return this.teamBuilderService.formGroup.get('pokemons') as PickItemsFormGroup
  }

  updateStats(pokemons: string[]) {
    if (pokemons.length === 0) {
      this.currentStats = INITIAL_STATS;
      return;
    }

    forkJoin(
      pokemons.map(p => this.pokemonService.getPokemon(p))
    ).pipe(
      map(pokemonList => {
        const statsMap = new Map<string, number>();
        for (const pokemon of pokemonList) {
          for (const stat of pokemon.stats) {
            const name = stat.stat.name;
            const current = statsMap.get(name) ?? 0;
            statsMap.set(name, current + stat.base_stat);
          }
        }
        return Array.from(statsMap.entries()).map(([name, value]) => ({name, value}));
      })
    ).subscribe(result => {
      this.currentStats = result;
    });
  }


  protected override initData(): void {
    this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.updateStats(data.selectedId ?? [])
    })
  }


  async handleSubmit() {
    if (!this.formGroup.valid) return;

    await this.router.navigate(['team-builder', 'build', 'potions'])
  }
}

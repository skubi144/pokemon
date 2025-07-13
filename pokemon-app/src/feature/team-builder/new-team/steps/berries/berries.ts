import {Component, DestroyRef} from '@angular/core';
import {PickItemsFormGroup} from '../common/form';
import {
  ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner
} from '../../../../../data-access/model/apiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner';
import {TeamBuilderService} from '../../service/team-builder-service';
import {Router, RouterLink} from '@angular/router';
import {PokemonService} from '../../../../../data-access/services/pokemon-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ReactiveFormsModule} from '@angular/forms';
import {NzFormControlComponent, NzFormItemComponent} from 'ng-zorro-antd/form';
import {Table} from '../../../../../shared/ui/table/table';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../data-access/services/loading-service';
import {AbstractPickItemsComponent} from '../common/abstract-pick-items';
import {TreeMapModule} from '@swimlane/ngx-charts';
import {NgIf} from '@angular/common';
import {forkJoin, map} from 'rxjs';

const INITIAL_STATE = [
  {"name": "spicy", "value": 0},
  {"name": "dry", "value": 0},
  {"name": "sweet", "value": 0},
  {"name": "bitter", "value": 0},
  {"name": "sour", "value": 0}
]

@Component({
  selector: 'app-berries',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    Table,
    NzFlexDirective,
    NzButtonComponent,
    RouterLink,
    TreeMapModule,
    NgIf
  ],
  templateUrl: './berries.html',
  styleUrl: './berries.css'
})
export class Berries extends AbstractPickItemsComponent {
  berries: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[] = [];
  flavours: Array<{ name: string; value: number }> = INITIAL_STATE;

  constructor(protected override destroyRef: DestroyRef,
              protected loadingService: LoadingService,
              private teamBuilderService: TeamBuilderService,
              private pokemonService: PokemonService,
              private router: Router) {
    super(destroyRef);
  }

  updateFlavours(berries: string[]): void {
    if (berries.length === 0) {
      this.flavours = INITIAL_STATE;
    }
    forkJoin(berries.map(b => this.pokemonService.getBerry(b))).pipe(
      map(berries => {
        const statsMap = new Map<string, number>();
        for (const berry of berries) {
          for (const flavor of berry.flavors) {
            const name = flavor.flavor.name ?? '';
            const current = statsMap.get(name) ?? 0;
            statsMap.set(name, current + flavor.potency);
          }
        }
        return Array.from(statsMap.entries()).map(([name, value]) => ({name, value}));
      })
    ).subscribe(result => {
      this.flavours = result;
    })
  }

  override initData() {
    this.pokemonService.getBerriesAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.berries = data
      })
    this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({selectedId}) => {
      this.updateFlavours(selectedId ?? []);
    })
  }

  override getFormGroup(): PickItemsFormGroup {
    return this.teamBuilderService.formGroup.get('berries') as PickItemsFormGroup;
  }

  override async handleSubmit() {
    if (!this.formGroup.valid) return;

    await this.router.navigate(['team-builder', 'build', 'berries'])
  }
}

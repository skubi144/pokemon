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

@Component({
  selector: 'app-berries',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    Table,
    NzFlexDirective,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './berries.html',
  styleUrl: './berries.css'
})
export class Berries {
  formGroup!: PickItemsFormGroup;
  selectedId: string[] = []
  potions: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[] = []

  constructor(protected loadingService: LoadingService, private onDestroy: DestroyRef, private teamBuilderService: TeamBuilderService, private router: Router, private pokemonService: PokemonService) {
  }

  initFormGroup(): void {
    this.formGroup = this.teamBuilderService.formGroup.get('berries') as PickItemsFormGroup
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.onDestroy))
      .subscribe(value => {
        this.selectedId = [...value.selectedId ?? []]
      })
    this.selectedId = [...this.formGroup.get('selectedId')?.value ?? []]
    this.formGroup.markAsDirty()
  }

  initData() {
    this.pokemonService.getBerriesAll()
      .pipe(takeUntilDestroyed(this.onDestroy))
      .subscribe(data => {
        this.potions = data
      })
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.initData();
  }


  handleToggleItem($event: { id: string; value: boolean }) {
    const {id, value} = $event;
    let selectedPokemonId = [...(this.formGroup.get('selectedId')?.value ?? []) as string[]];
    if (value) {
      selectedPokemonId.push(id)
    } else {
      selectedPokemonId = selectedPokemonId.filter(item => item !== id)
    }

    this.formGroup.get('selectedId')?.patchValue?.(selectedPokemonId);
  }

  async handleSubmit() {
    if (!this.formGroup.valid) return;

    await this.router.navigate(['team-builder', 'build', 'berries'])
  }
}

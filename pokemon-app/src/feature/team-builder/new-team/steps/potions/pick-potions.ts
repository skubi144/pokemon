import {Component, DestroyRef, OnInit} from '@angular/core';
import {PokemonService} from '../../../../../data-access/services/pokemon-service';
import {PickItemsFormGroup} from '../common/form';
import {TeamBuilderService} from '../../service/team-builder-service';
import {Router, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner
} from '../../../../../data-access/model/apiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner';
import {NzFormControlComponent, NzFormItemComponent} from 'ng-zorro-antd/form';
import {ReactiveFormsModule} from '@angular/forms';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Table} from '../../../../../shared/ui/table/table';

@Component({
  selector: 'app-pick-potions',
  imports: [
    NzFormItemComponent,
    ReactiveFormsModule,
    NzFormControlComponent,
    NzFlexDirective,
    NzButtonComponent,
    RouterLink,
    Table
  ],
  templateUrl: './pick-potions.html',
  styleUrl: './pick-potions.css'
})
export class PickPotions implements OnInit {
  formGroup!: PickItemsFormGroup;
  selectedId: string[] = []
  potions: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[] = []

  constructor(private onDestroy: DestroyRef, private teamBuilderService: TeamBuilderService, private router: Router, private pokemonService: PokemonService) {
  }

  initFormGroup(): void {
    this.formGroup = this.teamBuilderService.formGroup.get('potions') as PickItemsFormGroup
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.onDestroy))
      .subscribe(value => {
        this.selectedId = [...value.selectedId ?? []]
      })
  }

  initData() {
    this.pokemonService.getPotionsAll().pipe(takeUntilDestroyed(this.onDestroy)).subscribe(data => {
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

    await this.router.navigate(['team-builder', 'build', 'potions'])
  }
}

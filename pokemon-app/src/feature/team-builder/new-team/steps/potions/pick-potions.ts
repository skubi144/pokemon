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
import {LoadingService} from '../../../../../data-access/services/loading-service';
import {AbstractPickItemsComponent} from '../common/abstract-pick-items';

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
export class PickPotions extends AbstractPickItemsComponent {
  potions: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[] = []

  constructor(protected override destroyRef: DestroyRef,
              protected loadingService: LoadingService,
              private teamBuilderService: TeamBuilderService,
              private pokemonService: PokemonService,
              private router: Router) {
    super(destroyRef);
  }

  override getFormGroup(): PickItemsFormGroup {
    return this.teamBuilderService.formGroup.get('potions') as PickItemsFormGroup;
  }

  override initData() {
    this.pokemonService.getPotionsAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.potions = data
      })
  }

  override async handleSubmit() {
    if (!this.formGroup.valid) return;

    await this.router.navigate(['team-builder', 'build', 'berries'])
  }
}

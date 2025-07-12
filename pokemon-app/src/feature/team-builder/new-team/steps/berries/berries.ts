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
export class Berries extends AbstractPickItemsComponent {
  berries: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[] = []

  constructor(protected override destroyRef: DestroyRef,
              protected loadingService: LoadingService,
              private teamBuilderService: TeamBuilderService,
              private pokemonService: PokemonService,
              private router: Router) {
    super(destroyRef);
  }

  override initData() {
    this.pokemonService.getBerriesAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.berries = data
      })
  }

  override getFormGroup(): PickItemsFormGroup {
    return this.teamBuilderService.formGroup.get('pokemons') as PickItemsFormGroup;
  }

  override async handleSubmit() {
    if (!this.formGroup.valid) return;

    await this.router.navigate(['team-builder', 'build', 'berries'])
  }
}

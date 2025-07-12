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
  ],
  templateUrl: './pick-pokemons.html',
  styleUrl: './pick-pokemons.css'
})
export class PickPokemons extends AbstractPickItemsComponent {
  constructor(protected override destroyRef: DestroyRef,
              protected loadingService: LoadingService,
              private teamBuilderService: TeamBuilderService,
              private router: Router) {
    super(destroyRef);
  }

  protected override initData(): void {
  }

  override getFormGroup(): PickItemsFormGroup {
    return this.teamBuilderService.formGroup.get('pokemons') as PickItemsFormGroup
  }

  async handleSubmit() {
    if (!this.formGroup.valid) return;

    await this.router.navigate(['team-builder', 'build', 'potions'])
  }
}

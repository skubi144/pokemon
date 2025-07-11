import {Component, DestroyRef, OnInit} from '@angular/core';
import {PokemonList} from '../../../../pokedex/pokemon-list/pokemon-list';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {Router, RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {PokemonsFormGroup} from '../common/form';
import {TeamBuilderService} from '../../service/team-builder-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ReactiveFormsModule} from '@angular/forms';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';

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
export class PickPokemons implements OnInit {
  formGroup!: PokemonsFormGroup;
  currentSelectedPokemonsId: string[] = []

  constructor(private onDestroy: DestroyRef, private teamBuilderService: TeamBuilderService, private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.teamBuilderService.formGroup.get('pokemons') as PokemonsFormGroup
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.onDestroy))
      .subscribe(value => {
        this.currentSelectedPokemonsId = [...value.selectedPokemonId ?? []]
      })
  }


  handleToggleItem($event: { id: string; value: boolean }) {
    const {id, value} = $event;
    let selectedPokemonId = [...(this.formGroup.get('selectedPokemonId')?.value ?? []) as string[]];
    if (value) {
      selectedPokemonId.push(id)
    } else {
      selectedPokemonId = selectedPokemonId.filter(item => item !== id)
    }

    this.formGroup.get('selectedPokemonId')?.patchValue?.(selectedPokemonId);
  }

  async handleSubmit() {
    console.log(this.formGroup);
    if (!this.formGroup.valid) return;

    await this.router.navigate(['team-builder', 'build', 'potions'])
  }
}

import {Component, DestroyRef, OnInit} from '@angular/core';
import {PokemonList} from '../../../../pokedex/pokemon-list/pokemon-list';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {Router, RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {PickItemsFormGroup} from '../common/form';
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
  formGroup!: PickItemsFormGroup;
  selectedId: string[] = this.formGroup?.get('selectedId')?.value ?? []

  constructor(private onDestroy: DestroyRef, private teamBuilderService: TeamBuilderService, private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.teamBuilderService.formGroup.get('pokemons') as PickItemsFormGroup
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.onDestroy))
      .subscribe(value => {
        this.selectedId = [...value.selectedId ?? []]
      })
    this.selectedId = [...this.formGroup?.get('selectedId')?.value ?? []]
  }


  handleToggleItem($event: { id: string; value: boolean }) {
    const {id, value} = $event;
    let itemsId = [...(this.formGroup.get('selectedId')?.value ?? []) as string[]];
    if (value) {
      itemsId.push(id)
    } else {
      itemsId = itemsId.filter(item => item !== id)
    }
    this.formGroup.get('selectedId')?.setValue?.(itemsId);
  }

  async handleSubmit() {
    if (!this.formGroup.valid) return;

    await this.router.navigate(['team-builder', 'build', 'potions'])
  }
}

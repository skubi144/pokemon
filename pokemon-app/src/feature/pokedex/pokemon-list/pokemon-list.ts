import {Component, DestroyRef, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {
  NzTableModule,
} from 'ng-zorro-antd/table';
import {FormsModule} from '@angular/forms';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzInputModule} from 'ng-zorro-antd/input';
import {Subscription} from 'rxjs';
import {PokemonService} from '../../../data-access/services/pokemon-service';
import {LoadingService} from '../../../data-access/services/loading-service';
import {
  ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner
} from '../../../data-access/model/apiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PokemonDetails} from './pokemon-details/pokemon-details';
import {NgIf} from '@angular/common';
import {Table} from '../../../shared/ui/table/table';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    FormsModule, NzButtonModule, NzDropDownModule, NzIconModule, NzInputModule, NzTableModule, PokemonDetails, NgIf, Table
  ],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList implements OnInit {
  @Input() selectable = false;
  @Input() selectedItemId: string[] = [];
  @Output() toggleItem = new EventEmitter<{ id: string; value: boolean }>();
  rows: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[] = [];
  pokemonListSubscription!: Subscription;
  selectedPokemonName?: string;

  constructor(private destroyRef: DestroyRef, private pokemonService: PokemonService, protected loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.pokemonListSubscription = this.pokemonService
      .getPokemonAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (payload) => {
          this.rows = payload;
          console.log(payload);
        }
      })
  }

  handleSelectPokemon(name: string) {
    this.selectedPokemonName = name
  }

  handleUnselectPokemon() {
    this.selectedPokemonName = undefined;
  }

  handleToggleItem($event: { id: string; value: boolean; }) {
    this.toggleItem.emit($event);
  }
}

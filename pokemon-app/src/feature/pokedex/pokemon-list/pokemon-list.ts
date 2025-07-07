import {Component, DestroyRef, OnInit,} from '@angular/core';
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
import {RouterLink, RouterOutlet} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PokemonDetails} from './pokemon-details/pokemon-details';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    FormsModule, NzButtonModule, NzDropDownModule, NzIconModule, NzInputModule, NzTableModule, RouterOutlet, RouterLink, PokemonDetails, NgIf
  ],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList implements OnInit {
  rows: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[] = [];
  pokemonListSubscription!: Subscription;
  selectedPokemonName?: string;
  searchValue = '';
  visible = false;
  filteredRows: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[] = []

  reset(): void {
    this.searchValue = '';
    this.filteredRows = this.rows;
  }

  search(): void {
    this.visible = false;
    this.filteredRows = this.filteredRows.filter((item) => item.name.indexOf(this.searchValue) !== -1);
  }

  constructor(private destroyRef: DestroyRef, private pokemonService: PokemonService, protected loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.pokemonListSubscription = this.pokemonService
      .getPokemonAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (payload) => {
          this.rows = payload;
          this.filteredRows = payload;
        }
      })
  }

  handleSelectPokemon(name: string) {
    this.selectedPokemonName = name
  }

  handleUnselectPokemon() {
    this.selectedPokemonName = undefined;
  }
}

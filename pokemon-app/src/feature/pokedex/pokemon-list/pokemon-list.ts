import {Component,} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {
  NzTableModule, NzTableQueryParams,
} from 'ng-zorro-antd/table';
import {FormsModule} from '@angular/forms';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzInputModule} from 'ng-zorro-antd/input';
import {Subscription} from 'rxjs';
import {PokemonService} from '../../../data-access/services/pokemon-service';
import {PokemonDetail} from '../../../data-access/model/pokemonDetail';
import {LoadingService} from '../../../data-access/services/loading-service';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    FormsModule, NzButtonModule, NzDropDownModule, NzIconModule, NzInputModule, NzTableModule
  ],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList {
  rows: PokemonDetail[] = [];
  pokemonListSubscription!: Subscription;
  searchValue = '';
  visible = false;

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    // this.visible = false;
    // this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }


  constructor(private pokemonService: PokemonService, protected loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.pokemonListSubscription = this.pokemonService.getPokemonAll().subscribe({
      next: (payload) => {
        this.rows = payload;
      }
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const {pageSize, pageIndex, sort, filter} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
  }

}

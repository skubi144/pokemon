import {Routes} from '@angular/router';
import {PokemonList} from '../pokemon-list/pokemon-list';
import {PokemonDetails} from '../pokemon-list/pokemon-details/pokemon-details';

export const routes: Routes = [
  {
    path: '', component: PokemonList, children: [
      {path: ':pokemon', component: PokemonDetails},
    ]
  }
]

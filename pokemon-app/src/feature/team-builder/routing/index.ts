import {Routes} from '@angular/router';
import {PokemonList} from '../../team-builder/pokemon-list/pokemon-list';
import {TeamList} from '../team-list/team-list';
import {NewTeam} from '../new-team/new-team';
import {BaseParams} from '../new-team/steps/base-params/base-params';
import {PickPokemons} from '../new-team/steps/pick-pokemons/pick-pokemons';

export const routes: Routes = [
  {path: '', component: TeamList,},
  {
    path: 'build', component: NewTeam, children: [
      {path: 'base', component: BaseParams},
      {path: 'pokemons', component: PickPokemons},
      {path: 'potions', component: PickPokemons},
      {path: 'berries', component: PickPokemons},
    ]
  },
]

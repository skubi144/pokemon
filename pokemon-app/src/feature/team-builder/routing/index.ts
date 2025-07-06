import {Routes} from '@angular/router';
import {PokemonList} from '../../team-builder/pokemon-list/pokemon-list';
import {TeamList} from '../team-list/team-list';

export const routes: Routes = [
  {path: '', component: TeamList},
]

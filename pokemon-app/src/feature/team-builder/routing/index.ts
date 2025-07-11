import {Routes} from '@angular/router';
import {TeamList} from '../team-list/team-list';
import {NewTeam} from '../new-team/new-team';
import {BaseParams} from '../new-team/steps/base-params/base-params';
import {PickPokemons} from '../new-team/steps/pick-pokemons/pick-pokemons';
import {PickPotions,} from '../new-team/steps/potions/pick-potions';
import {Berries} from '../new-team/steps/berries/berries';
import {saveAlertGuard} from '../new-team/guards/save-alert-guard';

export const routes: Routes = [
  {path: '', component: TeamList,},
  {
    path: 'build', canDeactivate: [saveAlertGuard], component: NewTeam, children: [
      {path: 'base', component: BaseParams},
      {path: 'pokemons', component: PickPokemons},
      {path: 'potions', component: PickPotions},
      {path: 'berries', component: Berries},
    ]
  },
]

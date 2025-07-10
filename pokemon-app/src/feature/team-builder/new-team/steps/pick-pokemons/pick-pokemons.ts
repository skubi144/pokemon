import {Component} from '@angular/core';
import {PokemonList} from '../../../../pokedex/pokemon-list/pokemon-list';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {Router, RouterLink} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {BaseParamsFormGroup, PokemonsFormGroup} from '../common/form';
import {TeamBuilderService} from '../../service/team-builder-service';

@Component({
  selector: 'app-pick-pokemons',
  imports: [
    PokemonList,
    NzFlexDirective,
    RouterLink,
    NzButtonComponent
  ],
  templateUrl: './pick-pokemons.html',
  styleUrl: './pick-pokemons.css'
})
export class PickPokemons {
  formGroup!: PokemonsFormGroup;

  constructor(private teamBuilderService: TeamBuilderService, private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.teamBuilderService.formGroup.get('pokemons') as PokemonsFormGroup
  }
}

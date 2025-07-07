import {Component, OnInit} from '@angular/core';
import {PokemonDetail} from '../../../data-access/model/pokemonDetail';
import {PokemonService} from '../../../data-access/services/pokemon-service';
import {PokemonCard} from '../../../shared/ui/pokemon-card/pokemon-card';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {forkJoin, Observable} from 'rxjs';
import {NzFlexDirective} from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    PokemonCard,
    NzFlexDirective,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList implements OnInit {
  userPokemon = ['pikachu', 'raichu', 'snorlax', 'ekans'];
  pokemons$!: Observable<PokemonDetail[]>;

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemons$ = forkJoin(
      this.userPokemon.map(name => this.pokemonService.getPokemon(name))
    );
  }
}

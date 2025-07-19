import {PokemonDetail} from './pokemonDetail';
import {PokemonType} from './pokemonType';

export interface PokemonTeam {
  id: number;
  name: string;
  tags: PokemonType[];
  pokemons: string[];
  berries: string[];
  potions: string[];
}

import {PokemonDetail} from './pokemonDetail';

export interface PokemonTeam {
  id: number;
  name: string;
  pokemons: PokemonDetail['id'][];
}

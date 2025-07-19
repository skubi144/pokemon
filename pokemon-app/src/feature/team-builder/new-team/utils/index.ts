import {PokemonDetail} from '../../../../data-access/model';

export function getPokemonTypeCounts(pokemons: PokemonDetail[]): { name: string; value: number }[] {
  const typeCounts = new Map<string, number>();

  for (const pokemon of pokemons) {
    for (const typeInfo of pokemon.types) {
      const typeName = typeInfo.type.name;
      typeCounts.set(typeName, (typeCounts.get(typeName) ?? 0) + 1);
    }
  }

  return Array.from(typeCounts.entries()).map(([name, value]) => ({name, value}));
}

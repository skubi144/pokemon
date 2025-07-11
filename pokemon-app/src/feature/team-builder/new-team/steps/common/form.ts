import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface BaseParamsValue {
  name: string;
}

export interface PokemonsValue {
  selectedPokemonId: string[];
}

export interface NewTeamValue {
  baseParams: BaseParamsValue;
  pokemons: PokemonsValue;
}

export type BaseParamsFormGroup = FormGroup<{
  name: FormControl<string>;
}>;

export type PickItemsFormGroup = FormGroup<{
  selectedId: FormControl<string[]>;
}>;

export type NewTeamFormGroup = FormGroup<{
  baseParams: BaseParamsFormGroup;
  pokemons: PickItemsFormGroup;
  potions: PickItemsFormGroup;
}>;

export function createNewTeamForm(): NewTeamFormGroup {
  return new FormGroup({
    baseParams: new FormGroup({
        name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      },
      {updateOn: "submit"}),
    pokemons: new FormGroup({
      selectedId: new FormControl<string[]>([], {
        nonNullable: true,
        validators: [Validators.maxLength(6)]
      }),
    },),
    potions: new FormGroup({
      selectedId: new FormControl<string[]>([], {
        nonNullable: true,
        validators: [Validators.maxLength(6)]
      }),
    },),
  });
}

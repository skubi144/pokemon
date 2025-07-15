import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {TeamBuilderService} from '../service/team-builder-service';

const requiredDataBeforeStep: Record<string, Array<string>> = {
  base: [],
  pokemons: ['base'],
  potions: ['base', 'pokemons'],
  berries: ['base', 'pokemons', 'potions'],
  summary: ['base', 'pokemons', 'potions', 'berries'],
}
export const hasFulfilledPreviousRequiredDataGuard: CanActivateChildFn =async (childRoute, state) => {
  const teamBuilderService = inject(TeamBuilderService)
  const router = inject(Router)
  const steps = requiredDataBeforeStep[childRoute.routeConfig?.path ?? '']
  if (!steps) return false;

  const result = steps.reduce((acc, curr) => {
    console.log(teamBuilderService.formGroup.get(curr)?.valid, curr)
    return acc && !!teamBuilderService.formGroup.get(curr)?.valid
  }, true)

  if (!result) {
    await router.navigate(['/team-builder']);
  }

  return true;
};

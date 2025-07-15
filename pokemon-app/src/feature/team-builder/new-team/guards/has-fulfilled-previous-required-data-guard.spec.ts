import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { hasFulfilledPreviousRequiredDataGuard } from './has-fulfilled-previous-required-data-guard';

describe('hasFulfilledPreviousRequiredDataGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasFulfilledPreviousRequiredDataGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

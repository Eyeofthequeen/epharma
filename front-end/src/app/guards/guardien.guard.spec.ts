import { TestBed } from '@angular/core/testing';

import { GuardienGuard } from './guardien.guard';

describe('GuardienGuard', () => {
  let guard: GuardienGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardienGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

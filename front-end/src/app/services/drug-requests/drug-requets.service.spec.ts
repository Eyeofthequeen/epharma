import { TestBed } from '@angular/core/testing';

import { DrugRequetsService } from './drug-requets.service';

describe('DrugRequetsService', () => {
  let service: DrugRequetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugRequetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

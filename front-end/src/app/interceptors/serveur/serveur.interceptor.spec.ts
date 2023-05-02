import { TestBed } from '@angular/core/testing';

import { ServeurInterceptor } from './serveur.interceptor';

describe('ServeurInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ServeurInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ServeurInterceptor = TestBed.inject(ServeurInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

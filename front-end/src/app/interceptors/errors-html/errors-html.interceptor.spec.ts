import { TestBed } from '@angular/core/testing';

import { ErrorsHTMLInterceptor } from './errors-html.interceptor';

describe('ErrorsHTMLInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorsHTMLInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorsHTMLInterceptor = TestBed.inject(ErrorsHTMLInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

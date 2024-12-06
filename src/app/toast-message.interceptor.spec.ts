import { TestBed } from '@angular/core/testing';

import { ToastMessageInterceptor } from './toast-message.interceptor';

describe('ToastMessageInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ToastMessageInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ToastMessageInterceptor = TestBed.inject(ToastMessageInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

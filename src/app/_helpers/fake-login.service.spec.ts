import { TestBed } from '@angular/core/testing';

import { FakeLoginService } from './fake-login.service';

describe('FakeLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FakeLoginService = TestBed.get(FakeLoginService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SedeServiceService } from './sede-service.service';

describe('SedeServiceService', () => {
  let service: SedeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SedeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

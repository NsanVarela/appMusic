import { TestBed } from '@angular/core/testing';

import { HorlogeService } from './horloge.service';

describe('HorlogeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HorlogeService = TestBed.get(HorlogeService);
    expect(service).toBeTruthy();
  });
});

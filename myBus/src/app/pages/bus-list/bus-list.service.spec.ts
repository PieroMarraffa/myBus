import { TestBed } from '@angular/core/testing';

import { BusListService } from './bus-list.service';

describe('BusListService', () => {
  let service: BusListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

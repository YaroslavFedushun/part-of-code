import { TestBed } from '@angular/core/testing';

import { VehicleDataRequestsService } from './vehicle-data-requests.service';

describe('VehicleDataRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleDataRequestsService = TestBed.get(VehicleDataRequestsService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PropertyControlService } from './property-control.service';

describe('PropertyControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyControlService = TestBed.get(PropertyControlService);
    expect(service).toBeTruthy();
  });
});

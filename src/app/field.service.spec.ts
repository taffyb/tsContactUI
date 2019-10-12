import { TestBed } from '@angular/core/testing';

import { FieldService } from './field.service';

describe('PropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldService = TestBed.get(FieldService);
    expect(service).toBeTruthy();
  });
});

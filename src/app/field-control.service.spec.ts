import { TestBed } from '@angular/core/testing';

import { FieldControlService } from './field-control.service';

describe('FieldControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldControlService = TestBed.get(FieldControlService);
    expect(service).toBeTruthy();
  });
});

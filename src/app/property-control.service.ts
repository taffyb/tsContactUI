import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PropertyBase } from './classes/property-base';

@Injectable()
export class PropertyControlService {
  constructor() { }

  toFormGroup(properties: PropertyBase<any>[] ) {
    let group: any = {};

    properties.forEach(property => {
      group[property.key] = property.required ? new FormControl(property.value || '', Validators.required)
                                              : new FormControl(property.value || '');
    });
    return new FormGroup(group);
  }
}
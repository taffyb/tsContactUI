import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FieldBase } from './classes/field-base';

@Injectable()
export class FieldControlService {
  constructor() { }

  toFormGroup(fields: FieldBase<any>[] ) {
    let group: any = {};

    fields.forEach(field => {
//      console.log(`FieldControlService.toFormGroup.field:${field}`);
      group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
                                              : new FormControl(field.value || '');
    });
    return new FormGroup(group);
  }
}
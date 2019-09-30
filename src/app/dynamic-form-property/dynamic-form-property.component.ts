import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { PropertyBase }     from '../classes/property-base';

@Component({
  selector: 'app-property',
  templateUrl: './dynamic-form-property.component.html'
})
export class DynamicFormPropertyComponent {
  @Input() property: PropertyBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.property.key].valid; }
}

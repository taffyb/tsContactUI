import { PropertyBase } from './property-base';

export class CheckboxProperty extends PropertyBase<string> {
  controlType = 'checkbox';

  constructor(options: {} = {}) {
    super(options);
  }
}
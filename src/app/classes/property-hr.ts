import { PropertyBase } from './property-base';

export class HLineProperty extends PropertyBase<string> {
  controlType = 'hr';

  constructor(options: {} = {}) {
    super(options);
  }
}
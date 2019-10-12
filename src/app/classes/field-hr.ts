import { FieldBase } from './field-base';

export class HLineField extends FieldBase<string> {
  controlType = 'hr';

  constructor(options: {} = {}) {
    super(options);
  }
}
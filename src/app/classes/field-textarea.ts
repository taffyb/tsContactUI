import { FieldBase } from './field-base';

export class TextareaField extends FieldBase<string> {
  controlType = 'textarea';
  options: {rows: string, cols: string};

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || {rows:"5",cols:"50"};
//    console.log(`${options['label']}`);
  }
  
}
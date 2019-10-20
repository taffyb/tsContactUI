import { FieldBase } from './field-base';

export class FieldGroup<T>{
    name:string;
    fields:FieldBase<T>[];
}
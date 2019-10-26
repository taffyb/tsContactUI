import { FieldBase } from './field-base';

export class FieldGroup<T>{
    name:string;
    order:number;
    fields:FieldBase<T>[];
}
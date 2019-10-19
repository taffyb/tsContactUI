import {IEntity} from './IEntity';
import {IProp} from './IProp';

export class BaseEntity implements IEntity{
    type:string;
    uuid:string;
    props:IProp[];
}
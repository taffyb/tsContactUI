import {IProp} from './IProp';

export interface IEntity{
    type:string;
    uuid:string;
    display:string;
    icon:string;
    props:IProp[];
}
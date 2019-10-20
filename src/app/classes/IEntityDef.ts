import {IProperty} from './IProperty'

export interface IEntityDef{
    name:string;
    uuid:string;
    display:string;
    props:IProperty[];
}
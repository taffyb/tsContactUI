import {IProperty} from './IProperty'

export interface IEntityDef{
    name:string;
    uuid:string;
    props:IProperty[];
}
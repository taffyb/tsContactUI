import {IPropertyGroup} from './IPropertyGroup';

export interface IEntityDef {
    name: string;
    uuid: string;
    display: string;
    groups: IPropertyGroup[];
}

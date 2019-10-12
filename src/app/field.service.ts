import { Injectable }       from '@angular/core';

import { DropdownField } from './classes/field-dropdown';
import { FieldBase }     from './classes/field-base';
import { TextboxField }  from './classes/field-textbox';
import { CheckboxField }  from './classes/field-checkbox';
import { TextareaField }  from './classes/field-textarea';
import { HLineField }  from './classes/field-hr';

import {ENTITY_DEFS} from './data/EntityDefs'

@Injectable()
export class FieldService {

  // TODO: get from a remote source of field metadata
  // TODO: make asynchronous
    

  getFields():FieldBase<any>[] {

    let fields: FieldBase<any>[] = [];  
    let entityDef=ENTITY_DEFS.entityDefs[2];
    let e={
            "Firstname": "John",
            "uuid": "4a746383-2b88-4614-97c0-08964e40b919",
            "Surname": "Smith",
            "Notes": "this is some \n multi\nlined\ntext",
            "wemail": "smith.john@domain.co.uk"
        };
    
    for(let key in entityDef.props){
        if(key!="uuid"){
            fields.push(this.contactdb2PropertyType(entityDef.props[key][0],e));
        }        
    }
    return fields.sort((a, b) => a.order - b.order);
  }
  
  contactdb2PropertyType(p,e):FieldBase<any>{
      let rtn:FieldBase<any>;
      switch(p.type){
          case "string":
              rtn=new TextboxField({
                   key:p.name,
                   value:e[p.name],
                   label:p.label || p.name,
                   order:p.order,
                   required:!!p.required});
              break;
          case "date":
              rtn=new TextboxField({
                  key:p.name,
                  value:e[p.name],
                  label:p.label || p.name,
                  order:p.order,
                  type:"date",
                  required:!!p.required});
              break;
          case "email":
              rtn=new TextboxField({
                  key:p.name,
                  value:e[p.name],
                  label:p.label || p.name,
                  order:p.order,
                  type:"email",
                  required:!!p.required});
              break;
          case "memo":
              rtn=new TextareaField({
                  key:p.name,
                  value:e[p.name],
                  label:p.label || p.name,
                  order:p.order,
                  type:"date",
                  required:!!p.required});
              break;
          case "true-false":
              rtn=new CheckboxField({
                  key:p.name,
                  value:e[p.name],
                  label:p.label || p.name,
                  order:p.order,
                  required:!!p.required});
              break;          
      }

    console.log(`Field :${JSON.stringify(rtn)}`);
    
      return rtn;
  }
    
    
//  getProperties() {
//
//    let fields: FieldBase<any>[] = [
//
//      new DropdownField({
//        key: 'brave',
//        label: 'Bravery Rating',
//        options: [
//          {key: 'solid',  value: 'Solid'},
//          {key: 'great',  value: 'Great'},
//          {key: 'good',   value: 'Good'},
//          {key: 'unproven', value: 'Unproven'}
//        ],
//        order: 3
//      }),
//
//      new TextboxField({
//        key: 'firstName',
//        label: 'First name',
//        value: 'Bombasto',
//        required: true,
//        order: 1
//      }),
//
//      new TextboxField({
//        key: 'emailAddress',
//        label: 'DOB',
//        type: 'date',
//        order: 2
//      }),
//
//      new TextareaField({
//        key: 'notes',
//        label: 'Notes',
//        type: 'textarea',
//        order: 5
//      }),
//
//      new CheckboxField({
//        key: 'isContractor',
//        label: 'Is A Contractor',
//        order: 6
//      }),
//
//      new HLineField({
//        order: 4
//      })
//    ];
//
//    return fields.sort((a, b) => a.order - b.order);
//  }
}
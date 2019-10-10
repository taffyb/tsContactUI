import { Injectable }       from '@angular/core';

import { DropdownProperty } from './classes/property-dropdown';
import { PropertyBase }     from './classes/property-base';
import { TextboxProperty }  from './classes/property-textbox';
import { CheckboxProperty }  from './classes/property-checkbox';
import { TextareaProperty }  from './classes/property-textarea';
import { HLineProperty }  from './classes/property-hr';

import {ENTITY_DEFS} from './data/EntityDefs'

@Injectable()
export class PropertyService {

  // TODO: get from a remote source of property metadata
  // TODO: make asynchronous
    

  getProperties():PropertyBase<any>[] {

    let properties: PropertyBase<any>[] = [];  
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
            properties.push(this.contactdb2PropertyType(entityDef.props[key][0],e));
        }        
    }
    return properties.sort((a, b) => a.order - b.order);
  }
  
  contactdb2PropertyType(p,e):PropertyBase<any>{
      let rtn:PropertyBase<any>;
      switch(p.type){
          case "string":
              rtn=new TextboxProperty({key:p.name,
                   value:e[p.name],
                   label:p.label || p.name,
                   order:p.order,
                   required:!!p.required});
              break;
          case "date":
              rtn=new TextboxProperty({key:p.name,
                  value:e[p.name],
                  label:p.label || p.name,
                  order:p.order,
                  type:"date",
                  required:!!p.required});
              break;
          case "email":
              rtn=new TextboxProperty({key:p.name,
                  value:e[p.name],
                  label:p.label || p.name,
                  order:p.order,
                  type:"email",
                  required:!!p.required});
              break;
          case "memo":
              rtn=new TextareaProperty({key:p.name,
                  value:e[p.name],
                  label:p.label || p.name,
                  order:p.order,
                  type:"date",
                  required:!!p.required});
              break;
          case "true-false":
              rtn=new CheckboxProperty({key:p.name,
                  value:e[p.name],
                  label:p.label || p.name,
                  order:p.order,
                  required:!!p.required});
              break;          
      }

    console.log(`property :${JSON.stringify(rtn)}`);
    
      return rtn;
  }
    
    
//  getProperties() {
//
//    let properties: PropertyBase<any>[] = [
//
//      new DropdownProperty({
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
//      new TextboxProperty({
//        key: 'firstName',
//        label: 'First name',
//        value: 'Bombasto',
//        required: true,
//        order: 1
//      }),
//
//      new TextboxProperty({
//        key: 'emailAddress',
//        label: 'DOB',
//        type: 'date',
//        order: 2
//      }),
//
//      new TextareaProperty({
//        key: 'notes',
//        label: 'Notes',
//        type: 'textarea',
//        order: 5
//      }),
//
//      new CheckboxProperty({
//        key: 'isContractor',
//        label: 'Is A Contractor',
//        order: 6
//      }),
//
//      new HLineProperty({
//        order: 4
//      })
//    ];
//
//    return properties.sort((a, b) => a.order - b.order);
//  }
}
import { Injectable }       from '@angular/core';

import { DropdownProperty } from './classes/property-dropdown';
import { PropertyBase }     from './classes/property-base';
import { TextboxProperty }  from './classes/property-textbox';

@Injectable()
export class PropertyService {

  // TODO: get from a remote source of property metadata
  // TODO: make asynchronous
  getProperties() {

    let properties: PropertyBase<any>[] = [

      new DropdownProperty({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxProperty({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxProperty({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return properties.sort((a, b) => a.order - b.order);
  }
}
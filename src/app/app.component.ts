import { Component }       from '@angular/core';

import { PropertyService } from './property.service';

@Component({
  selector: 'app-root',
  template: ` 
    <div>
      This is under the form background
      <app-dynamic-form [properties]="properties" [title]="'Person'"></app-dynamic-form>
    </div>
  `,
  providers:  [PropertyService]
})
export class AppComponent {
  properties: any[];

  constructor(service: PropertyService) {
    this.properties = service.getProperties();
  }
}
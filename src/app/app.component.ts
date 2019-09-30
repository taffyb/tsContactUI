import { Component }       from '@angular/core';

import { PropertyService } from './property.service';

@Component({
  selector: 'app-root',
  template: ` 
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [properties]="properties"></app-dynamic-form>
    </div>
  `,
  providers:  [PropertyService]
})
export class AppComponent {
  properties: any[];

  constructor(service: PropertyService) {
    this.properties = service.getProperties();
    console.log(`AppComponent.constructor properties=${JSON.stringify(this.properties)}`);
  }
}
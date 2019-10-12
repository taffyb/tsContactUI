import { Component }       from '@angular/core';

import { FieldService } from './field.service';

@Component({
  selector: 'app-root',
  template: ` 
    <div>
      This is under the form background
      <app-dynamic-form [fields]="fields" [title]="'Person'"></app-dynamic-form>
    </div>
  `,
  providers:  [FieldService]
})
export class AppComponent {
  fields: any[];

  constructor(service: FieldService) {
    this.fields = service.getFields();
  }
}
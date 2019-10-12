import { Component , NgZone}       from '@angular/core';

import { FieldService } from './field.service';
import { DataService } from './data.service';
import {IEntityDef} from './classes/IEntityDef';
import {IEntity} from './classes/IEntity';

@Component({
  selector: 'app-root',
  template: ` 
    <div>
      This is under the form background
      <app-dynamic-form *ngIf="fields" [fields]="fields" [title]="'Person'"></app-dynamic-form>
      <button *ngIf="!fields" (click)="showForm()">Show Form</button>
    </div>
  `,
  providers:  [FieldService]
})
export class AppComponent {
  fields: any[];

  constructor(private fs: FieldService,private  ds:DataService,
          public zone: NgZone) {
   
  }
    
  async showForm(){
      const euuid:string = "4a746383-2b88-4614-97c0-08964e40b919";
      const entity:IEntity = await this.ds.getEntity(euuid).toPromise();
//      console.log(`showForm.entity: ${JSON.stringify(entity)}`);
      const entityDef = await this.ds.getEntityDef(entity.type);
//      console.log(`showForm.entityDef: ${JSON.stringify(entityDef)}`);
//      console.log(`AppComponent.constructor.entity ${JSON.stringify(entity)}`);
      
      this.zone.run(() => this.fields = this.fs.getFields(entityDef,entity));
  }
}
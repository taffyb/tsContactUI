import { Component , NgZone}       from '@angular/core';

import { FieldService } from './field.service';
import { DataService } from './data.service';
import {IEntityDef} from './classes/IEntityDef';
import {IEntity} from './classes/IEntity';

@Component({
  selector: 'app-root',
  template: ` 
    <div>
      <input type="text" id="euuid" [(ngModel)]="euuid">
      <select *ngIf="!euuid" id="entityType" [(ngModel)]="entityType">
          <option>Person</option>
          <option>Event</option>
          <option>Organisation</option>
      </select>
      <entity-form *ngIf="formVisible" [euuid]="euuid" [entityType]="entityType" (onClose)="hideForm()"></entity-form>
      <button *ngIf="!formVisible" (click)="showForm()">Show Form</button>
    </div>
  `,
  providers:  [FieldService]
})
export class AppComponent {
  fields: any[];
  formVisible:boolean=false;
  euuid:string="4a746383-2b88-4614-97c0-08964e40b919";
  entityType:string=""

  constructor(private fs: FieldService,private  ds:DataService,
          public zone: NgZone) {
   
  }    
  showForm(){
      this.formVisible=true;
  }
  hideForm(){
      this.formVisible=false; 
  }
}
import { Component, OnInit } from '@angular/core';

import { FieldControlService } from '../field-control.service';
import {IProperty} from '../classes/IProperty';
import {BaseProperty} from '../classes/BaseProperty';

@Component({
  selector: 'entity-def-form',
  templateUrl: './entity-def-form.component.html',
  styleUrls: ['./entity-def-form.component.css'],
  providers: [ FieldControlService ]
})
export class EntityDefFormComponent implements OnInit {
  propertyFormVisible:boolean=false;
  properties:IProperty[]=[new BaseProperty()];

  constructor() { }

  ngOnInit() {
      this.properties[0].name = "Notes"
  }

  addGroup(){
      
  }
  showPropertyForm(){
      this.propertyFormVisible=true;
  }
  hidePropertyForm(){
      this.propertyFormVisible=false;
  }
  saveProperty(p:IProperty){
      console.log(`${JSON.stringify(p)}`);
      this.propertyFormVisible=false;
  }
}

import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

import { FieldControlService } from '../field-control.service';
import {IProperty} from '../classes/IProperty';
import {BaseProperty} from '../classes/BaseProperty';

@Component({
  selector: 'entity-def-form',
  styleUrls: ['../css/dynamic-form-common.css'],
  templateUrl: './entity-def-form.component.html',
  providers: [ FieldControlService ]
})
export class EntityDefFormComponent implements OnInit {
  propertyFormVisible:boolean=false;
  properties:IProperty[]=[new BaseProperty()];
  @Output()onClose:EventEmitter<boolean> = new EventEmitter<boolean>();

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
      this.onClose.emit(true);
  }
  saveProperty(p:IProperty){
      console.log(`${JSON.stringify(p)}`);
      this.propertyFormVisible=false;
  }
}

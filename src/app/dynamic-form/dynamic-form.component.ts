import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { FieldBase }              from '../classes/field-base';
import { FieldControlService }    from '../field-control.service';
import { DataService }    from '../data.service';

import {IEntityDef} from '../classes/IEntityDef';
import {IEntity} from '../classes/IEntity';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ FieldControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input()fields: FieldBase<any>[] = [];
  @Input()title: string="Dynamic Form";
  form: FormGroup;
  payLoad = '';
  

  constructor(private pcs: FieldControlService,private ds: DataService) { 
  }

  ngOnInit() {
    this.form = this.pcs.toFormGroup(this.fields);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
  
  onGetEntityDefs(){ 
      console.log(`getEntityDefs()`);
      let entityDefs:IEntityDef[];
      this.ds.getEntityDefs().subscribe((data: IEntityDef[]) => {
          console.log(`EntityDef Data: ${JSON.stringify(data)}`);
          entityDefs = data;
        }); 
      
  }
  
  onGetEntity(){ 
      console.log(`getEntity()`);
      let entity:IEntity;
      const euuid:string = "4a746383-2b88-4614-97c0-08964e40b919";
      this.ds.getEntity(euuid).subscribe((data: IEntity) => {
          console.log(`Entity Data: ${JSON.stringify(data)}`);
          entity = data;
        }); 
      
  }
}
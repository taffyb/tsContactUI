import { Component, Input,Output, OnInit, EventEmitter  }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { FieldBase }              from '../classes/field-base';
import { FieldControlService }    from '../field-control.service';
import { DataService }    from '../data.service';
import { FieldService } from '../field.service';

import {IEntityDef} from '../classes/IEntityDef';
import {IEntity} from '../classes/IEntity';
import {BaseEntity} from '../classes/BaseEntity';

@Component({
  selector: 'entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css'],
  providers: [ FieldControlService ]
})
export class EntityFormComponent implements OnInit {
  @Input()euuid:string;
  @Input()entityType:string;
  @Output()onClose:EventEmitter<boolean> = new EventEmitter();
  fields: FieldBase<any>[] = [];
  title: string="Dynamic Form";
  entity:IEntity;
  form: FormGroup;
  formChanged:boolean=false;
  payLoad = '';
  newEntitySaved:boolean=false;
  activeTab:string="Details";
  

  constructor(private fcs: FieldControlService,private fs: FieldService,private ds: DataService) { 
  }

  ngOnInit() {
    this.loadForm();
  }

  async onSubmit() {
    let entity=JSON.parse(JSON.stringify(this.form.value));
    let response;
    if(this.euuid){
        entity["uuid"]=this.euuid;
        entity["type"]=this.title;
        response = await this.ds.updateEntity(entity).toPromise();
    }else{
        entity["type"]=this.entityType;
        response = await this.ds.addEntity(entity).toPromise();
        this.newEntitySaved=true;
    }
    this.formChanged = false;
  }
 
  onCancel(){
      this.onClose.emit(this.newEntitySaved);
  }
  getIcon():string{
      let iconPath:string=this.entity.icon || `/assets/${this.entityType}'.svg`;
      return iconPath;
  }
  async loadForm(){
      let entityDef;
//      console.log(`entity-form.load: euuid[${this.euuid}] type[${this.entityType}]`);
      if(this.euuid){
        this.entity = await this.ds.getEntity(this.euuid).toPromise();
        entityDef = await this.ds.getEntityDef(this.entity.type);
        this.entityType=this.entity.type;
        this.title=this.entity.type;
        this.fields = this.fs.getFields(entityDef,this.entity);
      }else{
          this.entity=new BaseEntity();
          entityDef = await this.ds.getEntityDef(this.entityType);
          this.title=this.entityType ;
          this.fields = this.fs.getFields(entityDef,null);
      }

      this.form =this.fcs.toFormGroup(this.fields);
      this.form.valueChanges.subscribe(form => {
          this.formChanged=true;
      });    
  }
}
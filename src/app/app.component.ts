import { Component , NgZone, OnInit}       from '@angular/core';

import { FieldService } from './field.service';
import { DataService } from './data.service';
import {IEntityDef} from './classes/IEntityDef';
import {IEntity} from './classes/IEntity';

@Component({
  selector: 'app-root',
  templateUrl: `app.component.html`,
  providers:  [FieldService]
})
export class AppComponent implements OnInit {
  fields: any[];
  isEntityFormVisible:boolean=false;
  isEntityDefFormVisible:boolean=false;
  euuid:string="";
  entityType:string="Person";
  entityDefType:string="Person";
  entities:IEntity[]=[];
  entityDefs:IEntityDef[];

  constructor(private fs: FieldService,private  ds:DataService,
          public zone: NgZone) {
      ds.getEntityDefs()
          .then(data => {
              this.entityDefs = data;
          });
  }    
  ngOnInit() {
      this.getEntities();
      this.getEntityDefs();
  }
  async getEntities() {
      this.entities = await this.ds.getEntityList();
  }
  async getEntityDefs() {
      this.entityDefs = await this.ds.getEntityDefList();
//      console.log(`${JSON.stringify(this.entityDefs)}`);
  }
  showEntityForm(){
      this.isEntityFormVisible=true;
  }
  showEntityDefForm(entityDefType:string){
      this.entityDefType=entityDefType;
      this.isEntityDefFormVisible=true;
  }
  hideEntityForm(status){
//      console.log(`${status}`);
      if(status===true){
          this.refreshEntityList();
      }
      this.isEntityFormVisible=false; 
  }
  hideEntityDefForm(){
      this.isEntityDefFormVisible=false
  }
  async deleteEntity(uuid:string){
      let response = await this.ds.deleteEntity(uuid).toPromise();
      this.refreshEntityList();
  }
  async deleteEntityDef(uuid:string){
      let response = await this.ds.deleteEntity(uuid).toPromise();
      this.refreshEntityDefList();
  }
  refreshEntityList(){
      this.entities=[];
      this.zone.run(async () => this.entities = await this.ds.getEntityList(true));
  }
  refreshEntityDefList(){
      this.entities=[];
      this.zone.run(async () => this.entityDefs = await this.ds.getEntityDefList(true));
  }
}
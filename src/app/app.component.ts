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
  }
  async getEntities() {
      this.entities = await this.ds.getEntityList();
  }
  showEntityForm(){
      this.isEntityFormVisible=true;
  }
  showEntityDefForm(){
      this.isEntityDefFormVisible=true;
  }
  hideEntityForm(status){
      console.log(`${status}`);
      if(status===true){
          this.refreshEntityList();
      }
      this.isEntityFormVisible=false; 
  }
  hideEntityDefForm(){
      this.isEntityDefFormVisible=false
  }
  async delete(uuid:string){
      let response = await this.ds.deleteEntity(uuid).toPromise();
      this.refreshEntityList();
  }
  refreshEntityList(){
      this.entities=[];
      this.zone.run(async () => this.entities = await this.ds.getEntityList(true));
  }
}
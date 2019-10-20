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
  formVisible:boolean=false;
  euuid:string="";
  entityType:string="";
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
      console.log(`getEntities: ${JSON.stringify(this.entities)}`);
  }
  showForm(){
      this.formVisible=true;
  }
  hideForm(){
      this.formVisible=false; 
  }
}
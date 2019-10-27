import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {IEntityDef} from '../classes/IEntityDef';

@Component({
  selector: 'entity-def-list',
  templateUrl: './entity-def-list.component.html',
  styleUrls: ['../css/list-common.css','./entity-def-list.component.css']
})
export class EntityDefListComponent implements OnInit {
    title:string="Entity Definition List";
    @Input()entityDefs:IEntityDef[]=[];
    @Output()onSelect:EventEmitter<string> = new EventEmitter<string>();
    @Output()onDelete:EventEmitter<string> = new EventEmitter<string>();
    
    constructor() { }

    ngOnInit() {
//        console.log(`entities ${JSON.stringify(this.entityDefs)}`);
    }

    selected(uuid:string){
        console.log(`entityDef Type ${uuid}`);
        this.onSelect.emit(uuid);        
    }
    delete(uuid:string){
        this.onDelete.emit(uuid);
    }
}

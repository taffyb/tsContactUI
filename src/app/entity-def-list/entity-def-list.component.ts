import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {IEntityDef} from '../classes/IEntityDef';

@Component({
  selector: 'entity-def-list',
  templateUrl: './entity-def-list.component.html',
  styleUrls: ['./entity-def-list.component.css']
})
export class EntityDefListComponent implements OnInit {
    @Input()entities:IEntityDef[]=[];
    @Output()onSelect:EventEmitter<string> = new EventEmitter<string>();
    @Output()onDelete:EventEmitter<string> = new EventEmitter<string>();
    
    constructor() { }

    ngOnInit() {
        console.log(`entities ${JSON.stringify(this.entities)}`);
    }

    selected(uuid:string){
        this.onSelect.emit(uuid);
    }
    delete(uuid:string){
        this.onDelete.emit(uuid);
    }
}

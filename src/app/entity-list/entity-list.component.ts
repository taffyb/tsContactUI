import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {IEntity} from '../classes/IEntity';

@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {
  @Input()entities:IEntity[]=[];
  @Output()onSelect:EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
      console.log(`entities ${JSON.stringify(this.entities)}`);
  }

  selected(uuid:string){
      this.onSelect.emit(uuid);
  }
}

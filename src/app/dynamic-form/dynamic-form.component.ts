import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { PropertyBase }              from '../classes/property-base';
import { PropertyControlService }    from '../property-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ PropertyControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input()properties: PropertyBase<any>[] = [];
  @Input()title: string="Dynamic Form";
  form: FormGroup;
  payLoad = '';

  constructor(private pcs: PropertyControlService) {  }

  ngOnInit() {
    this.form = this.pcs.toFormGroup(this.properties);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
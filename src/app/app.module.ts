import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EntityFormComponent } from './entity-form/entity-form.component';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityDefFormComponent } from './entity-def-form/entity-def-form.component';
import { EntityDefListComponent } from './entity-def-list/entity-def-list.component';
import { PropertyFormComponent } from './property-form/property-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityFormComponent,
    DynamicFormFieldComponent,
    EntityListComponent,
    EntityDefFormComponent,
    EntityDefListComponent,
    PropertyFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

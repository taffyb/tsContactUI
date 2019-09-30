import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PlayAreaComponent }   from './play-area/play-area.component';
import { DashboardComponent }   from './dashboard/dashboard.component';

const routes: Routes = [
     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
     { path: 'play-area/:gameId', component: PlayAreaComponent},
     { path: 'dashboard', component: DashboardComponent}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

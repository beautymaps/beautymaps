import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {import { bm_constants } from 'bmconfig/bmconfig.module' } from 'bmconfig/bmconfig'

import { AppComponent } from './app.component';
import { SupplyanddemandComponent } from './supplyanddemand/supplyanddemand.component';
import { HomeMapComponent } from './home-map/home-map.component';

const appRoutes: Routes = [
  {path: '', component: HomeMapComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SupplyanddemandComponent,
    HomeMapComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdFT1dyR4vrkIt3CXQiGekHUl2V7cqdII',
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

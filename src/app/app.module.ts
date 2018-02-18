import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

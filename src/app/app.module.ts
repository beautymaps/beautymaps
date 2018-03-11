import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SupplyanddemandComponent } from './supplyanddemand/supplyanddemand.component';
import { HomeMapComponent } from './home-map/home-map.component';
import { MapViewComponent } from './map-view/map-view.component';
import { ProductsComponent } from './products/products.component';

const appRoutes: Routes = [
  {path: '', component: HomeMapComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SupplyanddemandComponent,
    HomeMapComponent,
    MapViewComponent,
    ProductsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdFT1dyR4vrkIt3CXQiGekHUl2V7cqdII',
      libraries: ["places"]
    }),
    MatButtonModule, 
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule,
  MatDialog, MatDialogModule, MatTabsModule, MatDividerModule } from '@angular/material';
 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav'
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';
export const firebaseConfig = environment.firebase;

import { AppComponent } from './app.component';
import { SupplyanddemandComponent } from './supplyanddemand/supplyanddemand.component';
import { HomeMapComponent } from './home-map/home-map.component';
import { MapViewComponent } from './map-view/map-view.component';
import { ProductsComponent } from './products/products.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ActionButtonComponent } from './shared/action-button/action-button.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserComponent } from "./user/user.component";

import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { CreateDemandComponent } from './create-demand/create-demand.component';
import { ModalWindowComponent } from './shared/modal-window/modal-window.component';
import { PrivacyTermsComponent } from './privacy-terms/privacy-terms.component';
import { ProfileComponent } from './profile/profile.component';
import { AddProductComponent } from './add-product/add-product.component';



const appRoutes: Routes = [
  {path: 'search', component: LandingPageComponent},
  {path: 'home', component: HomeMapComponent},
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: ''}},
  { path: 'create-demand', component: CreateDemandComponent},
  { path: 'privacy-terms', component: PrivacyTermsComponent},
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SupplyanddemandComponent,
    HomeMapComponent,
    MapViewComponent,
    ProductsComponent,
    LandingPageComponent,
    FooterComponent,
    HeaderComponent,
    ActionButtonComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    CreateDemandComponent,
    ModalWindowComponent,
    PrivacyTermsComponent,
    ProfileComponent,
    AddProductComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdFT1dyR4vrkIt3CXQiGekHUl2V7cqdII',
      libraries: ["places"]
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,  // imports firebase/auth, only needed for auth features
    MatButtonModule, 
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDialogModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    MatTabsModule,
    MatDividerModule
  ],
  providers: [AuthGuard, AuthService, MatDialog],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalWindowComponent,
  ]
})

export class AppModule { }

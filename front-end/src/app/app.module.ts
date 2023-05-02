import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { CardComponent } from './components/card/card.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SearchComponent } from './components/search/search.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { AlertsComponent } from './pages/administration/alerts/alerts.component';
import { EmployeesComponent } from './pages/administration/employees/employees.component';
import { FilterComponent } from './components/filter/filter.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TableComponent } from './components/table/table.component';
import { RequetesComponent } from './pages/administration/requetes/requetes.component';
import { RegisterComponent } from './pages/register/register.component';
import { AlerteBlobalComponent } from './components/global-alert/global-alert.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormComponent } from './components/forms/form/form.component';
import { IdentificationComponent } from './components/forms/identification/identification.component';
import { DrugsComponent } from './pages/administration/drugs/drugs.component';

import { ServerProvider } from './interceptors/serveur/serveur.interceptor';
import { ErrorsHTMLProvider } from './interceptors/errors-html/errors-html.interceptor';
import { RequestsComponent } from './pages/requests/requests.component';
import { AllRequestsComponent } from './pages/requests/all-requests/all-requests.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    NavigationComponent,
    AdministrationComponent,
    CardComponent,
    InventoryComponent,
    NotFoundComponent,
    SearchComponent,
    DrugsComponent,
    SubMenuComponent,
    AlertsComponent,
    EmployeesComponent,
    FilterComponent,
    FiltersComponent,
    TableComponent,
    RequetesComponent,
    IdentificationComponent,
    RegisterComponent,
    AlerteBlobalComponent,
    ProfileComponent,
    FormComponent,
    RequestsComponent,
    AllRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDytn0jX1FJFJ7AAO-Y2F8M3wMiq4P5sdg",
      authDomain: "e-pharma-inf1013.firebaseapp.com",
      projectId: "e-pharma-inf1013",
      storageBucket: "e-pharma-inf1013.appspot.com",
      messagingSenderId: "979529010983",
      appId: "1:979529010983:web:b01f0e02628d9bdef6e302"
    }),
  ],
  providers: [
    ErrorsHTMLProvider,
    ServerProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

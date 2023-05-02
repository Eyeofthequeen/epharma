import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DrugsComponent } from './pages/administration/drugs/drugs.component';
import { AlertsComponent } from './pages/administration/alerts/alerts.component';
import { RequetesComponent } from './pages/administration/requetes/requetes.component';
import { EmployeesComponent } from './pages/administration/employees/employees.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RequestsComponent } from './pages/requests/requests.component';

import { GuardienGuard } from './guards/guardien.guard';
import { AllRequestsComponent } from './pages/requests/all-requests/all-requests.component';

const routes: Routes = [
    { path: '', canActivate: [GuardienGuard], component: InventoryComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'profile', canActivate: [GuardienGuard], component: ProfileComponent},
    { path: 'requests', canActivate: [GuardienGuard], component: RequestsComponent,
      children: [
        {
          path: 'all',
          component: AllRequestsComponent
        },
        {
          path: 'all/edit/:id',
          component: AllRequestsComponent
        }
    ]},
    { path: 'administration', canActivate: [GuardienGuard], component: AdministrationComponent,
      children: [
        {
          path: 'alerts',
          component: AlertsComponent
        },
        {
          path: 'drugs',
          component: DrugsComponent
        },
        {
          path: 'requetes',
          component: RequetesComponent
        },
        {
          path: 'employees',
          component: EmployeesComponent
        },
      ]
    },
    { path: '**', component: NotFoundComponent}
  ];

@NgModule({
declarations: [],
imports: [
    CommonModule,
    RouterModule.forRoot(routes)
],
exports: [RouterModule]
})
export class AppRoutingModule { }
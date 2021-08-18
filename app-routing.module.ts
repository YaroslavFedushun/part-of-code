import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from "./components/pages/register/register.component";
import { LoginComponent } from './components/pages/login/login.component';
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { SettingsComponent } from "./components/pages/settings/settings.component";

import { AuthGuard, NotAuthGuard } from './helpers';

const routes: Routes = ([
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [NotAuthGuard]   },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
]) as any;


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

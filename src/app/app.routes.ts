import { Routes } from '@angular/router';
import {HomeComponent} from "./components/global/home/home.component";
import {authGuardGuard} from "./auth/auth-guard.guard";
import {LoginComponent} from "./components/global/login/login.component";

export const routes: Routes = [
  {path:'',component: HomeComponent,canActivate:[authGuardGuard]},
  {path:'login',component: LoginComponent},

];

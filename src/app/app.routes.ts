import { Routes } from '@angular/router';
import { HomeComponent } from "./components/global/home/home.component";
import { authGuardGuard } from "./auth/auth-guard.guard";
import { LoginComponent } from "./components/global/login/login.component";
import { ResultTypeConfigComponent } from "./components/config/resultType/result-type-config/result-type-config.component";
import { ProcessTypeFormComponent } from "./components/config/processType/process-type-form/process-type-form.component";
import { ProcessTypeListComponent } from "./components/config/processType/process-type-list/process-type-list.component";
import { ProcessTypeInfoComponent } from "./components/config/processType/process-type-info/process-type-info.component";
import { ProcessTypeVersionConfigComponent } from "./components/config/process-type-version/process-type-version-config/process-type-version-config.component";
import { StepConfigComponent } from "./components/config/step/step-config/step-config.component";
import { TaskConfigComponent } from "./components/config/task/task-config/task-config.component";
import { ProcessTypeVersionInfoComponent } from "./components/config/process-type-version/process-type-version-info/process-type-version-info.component";
import { ValidProcessTypeListComponent } from "./components/use/valid-process-type-list/valid-process-type-list.component";
import { ProcessListComponent } from "./components/use/process/process-list/process-list.component";
import {ProcessPerformComponent} from "./components/use/process/process-perform/process-perform.component";

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'result-type-config', component: ResultTypeConfigComponent, canActivate: [authGuardGuard] },
  { path: 'process-type-form', component: ProcessTypeFormComponent, canActivate: [authGuardGuard] },
  { path: 'process-type-list', component: ProcessTypeListComponent, canActivate: [authGuardGuard] },
  { path: 'valid-process-type-list', component: ValidProcessTypeListComponent, canActivate: [authGuardGuard] },
  { path: 'process-type-info/:id', component: ProcessTypeInfoComponent, canActivate: [authGuardGuard] },
  { path: 'process-type-version-config/:id', component: ProcessTypeVersionConfigComponent, canActivate: [authGuardGuard] },
  { path: 'step-config/:id', component: StepConfigComponent, canActivate: [authGuardGuard] },
  { path: 'task-config/:id', component: TaskConfigComponent, canActivate: [authGuardGuard] },
  { path: 'process-type-version-info/:id', component: ProcessTypeVersionInfoComponent, canActivate: [authGuardGuard] },
  { path: 'process-list', component: ProcessListComponent, canActivate: [authGuardGuard] },
  {path:'process-perform/:id',component:ProcessPerformComponent,canActivate:[authGuardGuard]}
];

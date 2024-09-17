import { Routes } from '@angular/router';
import {HomeComponent} from "./components/global/home/home.component";
import { InfoComponent } from './components/global/info/info.component';
import {TesteurComponent} from "./components/global/testeur/testeur.component";
import {StepperComponent} from "./components/global/stepper/stepper.component";
import {
  ResultTypeConfigComponent
} from "./components/config/resultType/result-type-config/result-type-config.component";
import {ProcessTypeFormComponent} from "./components/config/processType/process-type-form/process-type-form.component";
import {ProcessTypeListComponent} from "./components/config/processType/process-type-list/process-type-list.component";
import {
  ProcessTypeValidListComponent
} from "./components/config/processType/process-type-valid-list/process-type-valid-list.component";
import {
  ProcessTypeConfigComponent
} from "./components/config/processType/process-type-config/process-type-config.component";
import {StepConfigComponent} from "./components/config/step/step-config/step-config.component";
import {TaskConfigComponent} from "./components/config/task/task-config/task-config.component";
import {ProcessTypeInfoComponent} from "./components/config/processType/process-type-info/process-type-info.component";
import {TaskProcessListComponent} from "./components/config/task/task-process-list/task-process-list.component";
import {ProcessFormComponent} from "./components/use/process/process-form/process-form.component";
import {ProcessListComponent} from "./components/use/process/process-list/process-list.component";
import {ProcessPerformComponent} from "./components/use/process/process-perform/process-perform.component";
import {ProcessStatistiqueComponent} from "./components/monitoring/process-statistique/process-statistique.component";

export const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'info/:id',component:InfoComponent},
  {path:'testeur',component:TesteurComponent},
  {path:'stepper',component:StepperComponent},

  {path:'resultTypes',component:ResultTypeConfigComponent},

  {path: 'processTypes/new',component:ProcessTypeFormComponent},
  {path:'processTypes',component:ProcessTypeListComponent},
  {path:'processTypes/valid',component:ProcessTypeValidListComponent},
  {path:'processTypes/config/:id',component:ProcessTypeConfigComponent},
  {path:'processTypes/info/:id',component:ProcessTypeInfoComponent},


  {path:'steps/config/:id',component:StepConfigComponent},

  {path:'tasks/config/:id',component:TaskConfigComponent},
  {path:'tasks/processes/:id',component:TaskProcessListComponent},

  {path:'processes/create/:id',component:ProcessFormComponent},
  {path:'processes/list',component:ProcessListComponent},
  {path:'processes/perform/:id',component:ProcessPerformComponent},

  {path:'stats',component:ProcessStatistiqueComponent}
];

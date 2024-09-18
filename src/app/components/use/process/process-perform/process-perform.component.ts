import {ChangeDetectorRef, Component} from '@angular/core';
import {ProcessFollower} from "../../../../models/ProcessFollower";
import {ResultType} from "../../../../models/resultType";
import {ActivatedRoute, Router} from "@angular/router";
import {ProcessService} from "../../../../services/process.service";
import { Task } from '../../../../models/task';
import {NgClass, NgForOf} from "@angular/common";
import {Process} from "../../../../models/process";
import {MatStep, MatStepper, MatStepperModule} from "@angular/material/stepper";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-process-perform',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './process-perform.component.html',
  styleUrls: ['./process-perform.component.css']
})

export class ProcessPerformComponent {
  list: ProcessFollower[] = [];
  isLoading = false;
  error: string | null = null;
  id: number=0;
  process: Process={} as Process;
  options: ResultType[] = [];
  actualTask:Task={} as Task;
  selectedOption : ResultType={} as ResultType;
  // regionId:string | null = null;
  // pageNumber:number=1;
  // pageSize:number=5;

  constructor(private route: ActivatedRoute,private cdr: ChangeDetectorRef,
              private router: Router,private processService: ProcessService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(<string>params.get('id'));
      if (this.id) {
        this.isLoading = true;
        this.setProcess();
        this.getProcessFollowerResultTaskView();
        this.setActualTask();
        this.setOptions();
      }

    });
  }

  setProcess(){
    if (this.id) {
      this.processService.getProcessById(this.id).subscribe({
        next: process => {
          this.process = process;
          this.isLoading = false;
        },
        error: error => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
    }
  }


  getProcessFollowerResultTaskView()
  {
    if(this.id!=0)
    {
      this.processService.getHistory(this.id).subscribe({
        next: processes => {
          this.list = processes;
          this.isLoading = false;
        },
        error: error => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
    }
  }

  setActualTask()
  {
    if (this.id) {
      this.processService.getLocation(this.id).subscribe({
        next: task => {
          this.actualTask = task;
          this.isLoading = false;
        },
        error: error => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
    }
    if(this.actualTask == null)
    {
      this.actualTask={} as Task;
      this.actualTask.name="No task";
      this.actualTask.idTask=0;
      alert("No task")
    }
  }

  setOptions()
  {
    if (this.id) {
      this.processService.getOptions(this.id).subscribe({
        next: options => {
          this.options = options;
          this.isLoading = false;
        },
        error: error => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
    }
  }

  reloadPage() {
    this.router.navigate(['/process/perform/'+this.id]).then(r => r);
  }

  nextTask()
  {
    if(this.selectedOption.id)
    {
      console.log("atooo eee")
      if(this.id)
      {
        console.log("atooo")
        this.processService.finish(this.id,this.selectedOption.id,this.actualTask.idTask).subscribe({
          next: data => {
            if(data.idNextTask==0)
            {
              alert("finished")
              // this.setActualTask();
              // this.getProcessFollowerResultTaskView();
            }
            else
            {
              this.setActualTask();
              this.getProcessFollowerResultTaskView();
              this.setOptions();
              this.selectedOption={} as ResultType;
            }
            this.isLoading = false;
            this.cdr.detectChanges();
            // this.reloadPage();
          },
          error: error => {
            this.error = error.message;
            this.isLoading = false;
          }
        });
      }

    }

  }
}

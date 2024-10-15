import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProcessTypeVersion} from "../../../../models/process-type-version";
import {ProcessTypeVersionInfo} from "../../../../models/process-type-version-info";
import {Step} from "../../../../models/step";
import {StepService} from "../../../../services/step.service";
import {TaskService} from "../../../../services/task.service";
import {ProcessTypeVersionService} from "../../../../services/process-type-version.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-process-type-version-info',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './process-type-version-info.component.html',
  styleUrl: './process-type-version-info.component.css'
})
export class ProcessTypeVersionInfoComponent implements OnInit {
  processTypeVersionInfo: ProcessTypeVersionInfo = {} as ProcessTypeVersionInfo;

  constructor(private route: ActivatedRoute, private router: Router,private processTypeVersionService: ProcessTypeVersionService , private stepService: StepService , private taskService:TaskService ) {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        console.log("id",id)
        this.setProcessTypeVersionInfo(Number(id));
      }
    });
  }

  ngOnInit(): void {

  }


  setProcessTypeVersionInfo(id:number)
  {
    this.processTypeVersionService.getVersionById(id).subscribe(
      {
        next: processTypeVersion => {
          this.processTypeVersionInfo.processTypeVersion = processTypeVersion;
          this.setSteps();
          console.log(this.processTypeVersionInfo)
        },
        error: error => {
          console.error('Error getting process type version:', error);
        }
      }

    );

  }

  setSteps()
  {
    this.stepService.listStep(this.processTypeVersionInfo.processTypeVersion.id).subscribe(
      {
        next: steps => {
          this.processTypeVersionInfo.listStep = steps;
          this.processTypeVersionInfo.listTask=[];
          for(let step of this.processTypeVersionInfo.listStep)
          {
            this.taskService.getTasksByStep(step.id).subscribe(
              {
                next: tasks => {
                  this.processTypeVersionInfo.listTask.push(tasks);
                },
                error: error => {
                  console.error('Error getting tasks:', error);
                }
              }
            );
          }
        },
        error: error => {
          console.error('Error getting steps:', error);
        }
      }

    );
  }






}

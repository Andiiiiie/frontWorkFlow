import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StepService} from "../../../../services/step.service";
import {TaskService} from "../../../../services/task.service";
import {MatDialog} from "@angular/material/dialog";
import {ExceptionResultService} from "../../../../services/exception-result.service";
import {Task} from "../../../../models/task";
import {ExceptionResult} from "../../../../models/exception-result";
import {
  ExceptionResultFormComponent
} from "../../exception-result/exception-result-form/exception-result-form.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-task-config',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './task-config.component.html',
  styleUrls:[ './task-config.component.css']
})
export class TaskConfigComponent implements OnInit{
  task:Task={} as Task;
  exceptions: ExceptionResult[]=[];

  constructor(private route: ActivatedRoute, private router: Router,private taskService:TaskService,private exceptionResultService:ExceptionResultService,private  cdr:ChangeDetectorRef,private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.setTask(params['id']);
    });
  }

  setTask(id:number)
  {
    this.taskService.getTaskById(id).subscribe(
      data => {
        this.task = data;
        this.setExceptions();
        this.cdr.detectChanges();
      },
      error => {
        console.error(error);
      }
    );
  }

  setExceptions()
  {
    this.exceptionResultService.getExceptionsByTask(this.task.id).subscribe(
      data => {
        this.exceptions = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  addException()
  {
    const dialogRef = this.dialog.open(ExceptionResultFormComponent,{data: {id: this.task.id}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }
}

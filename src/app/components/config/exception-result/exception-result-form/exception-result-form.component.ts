import {Component, Inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ExceptionResult} from "../../../../models/exception-result";
import {ResultType} from "../../../../models/result-type";
import { Task } from '../../../../models/task';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskService} from "../../../../services/task.service";
import {ExceptionResultService} from "../../../../services/exception-result.service";
import {ResultTypeService} from "../../../../services/result-type.service";

@Component({
  selector: 'app-exception-result-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './exception-result-form.component.html',
  styleUrls: ['./exception-result-form.component.css']
})
export class ExceptionResultFormComponent implements OnInit{
  newExceptionResult:ExceptionResult={} as ExceptionResult;
  resultTypes:ResultType[] = [];
  tasks:Task[] = [];
  task:Task={} as Task;
  idTask:number=0;
  error:string='';
  isLastIn: string | null = null; // Temporary property for dropdown selection


  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },private dialogRef: MatDialogRef<ExceptionResultFormComponent>,private taskService:TaskService,private exceptionResultService:ExceptionResultService,private resultTypeService:ResultTypeService) {
    this.idTask = data.id;
    this.setTask();
  }

  ngOnInit(): void {
  }

  setTask()
  {
    if(this.idTask)
    {
      this.taskService.getTaskById(this.idTask).subscribe(
        data => {
          this.task = data;
          this.setTasks();
          this.setResultTypes();
        },
        error => {
          this.error = error;
        }
      );
    }
  }

  setTasks()
  {
    if(this.task)
    {
      this.taskService.getTasksByStep(this.task.stepId).subscribe(
        data => {
          this.tasks = data;
        },
        error => {
          this.error = error;
        }
      );
    }
  }

  setResultTypes()
  {
    this.resultTypeService.getAll().subscribe(
      data => {
        this.resultTypes = data;
      },
      error => {
        this.error = error;
      }
    );
  }

  onSubmit()
  {

    this.newExceptionResult.currentTaskId=this.task.id;
    if(!this.newExceptionResult.nextTaskId)
    {
      this.newExceptionResult.isLastInProcess = this.isLastIn === 'process';
      this.newExceptionResult.isLastInStep = this.isLastIn === 'step';
    }
    console.log(this.newExceptionResult);
    this.exceptionResultService.createExceptionResult(this.newExceptionResult).subscribe({
      next: exceptionResult => {
        console.log('Exception Result created:', exceptionResult);
        this.dialogRef.close();
      },
      error: error => {
        this.error = error;
      }
    });
  }


}

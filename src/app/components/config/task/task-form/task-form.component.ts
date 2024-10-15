import {Component, Inject, OnInit} from '@angular/core';
import { Task } from '../../../../models/task';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskService} from "../../../../services/task.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
  newTask:Task={} as Task;
  idStep:number=0;
  error:string='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },private dialogRef: MatDialogRef<TaskFormComponent>,private taskService:TaskService) {
    this.idStep = data.id;
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.newTask.stepId=this.idStep;
    this.taskService.createTask(this.newTask).subscribe({
      next: task => {
        console.log('Task created:', task);
        this.dialogRef.close();
      },
      error: error => {
        this.error = error;
      }
    });
  }
}

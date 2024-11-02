import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Process} from "../../../../models/process";
import {ProcessService} from "../../../../services/process.service";
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-process-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './process-form.component.html',
  styleUrls:[ './process-form.component.css']
})
export class ProcessFormComponent {
  newProcess: Process = {} as Process;
  id: number = 0;
  error: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },private dialogRef: MatDialogRef<ProcessFormComponent>,private processService: ProcessService) {
    console.log('Received ID:', data.id);
    this.id = data.id;
  }

  onSubmit()
  {
    this.newProcess.processTypeVersionId=this.id;
    this.processService.createProcess(this.newProcess).subscribe({
      next: process => {
        Swal.fire({
          title: 'Success!',
          text: 'Process created successfully',
          icon: 'success'
        })
        this.dialogRef.close();
      },
      error: error => {
        this.error = error;
      }
    });
  }

}

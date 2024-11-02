import {Component, Inject} from '@angular/core';
import {ProcessTypeVersion} from "../../../../models/process-type-version";
import {ProcessType} from "../../../../models/process-type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ProcessTypeVersionService} from "../../../../services/process-type-version.service";

@Component({
  selector: 'app-process-type-version-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './process-type-version-form.component.html',
  styleUrls: ['./process-type-version-form.component.css']
})
export class ProcessTypeVersionFormComponent {
  newVersion: ProcessTypeVersion = {} as ProcessTypeVersion;
  id: number = 0;
  error: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },private dialogRef: MatDialogRef<ProcessTypeVersionFormComponent>,private processTypeVersionService: ProcessTypeVersionService) {
    console.log('Received ID:', data.id);
    this.id = data.id;
  }

  onSubmit()
  {
    this.newVersion.processTypeId=this.id;
    this.newVersion.creationDate = new Date().toISOString();
    console.log('New Version:', this.newVersion);
    this.processTypeVersionService.createVersion(this.newVersion).subscribe({
      next: processType => {
        console.log('Process Type created:', processType);
        this.dialogRef.close();

      },
      error: error => {
        this.error = error;
      }
    });
  }

}

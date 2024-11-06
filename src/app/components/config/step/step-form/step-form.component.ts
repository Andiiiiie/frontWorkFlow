import {Component, Inject, OnInit} from '@angular/core';
import {Step} from "../../../../models/step";
import {StepService} from "../../../../services/step.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-step-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './step-form.component.html',
  styleUrls:[ './step-form.component.css']
})
export class StepFormComponent implements OnInit{
  newStep:Step={} as Step;
  idVersion:number=0;
  error:string='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },private dialogRef: MatDialogRef<StepFormComponent>,private stepService:StepService,private router: Router) {
    this.idVersion = data.id;
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.newStep.processTypeVersionId=this.idVersion;
    this.stepService.addStep(this.newStep).subscribe({
      next: step => {
        console.log('Step created:', step);
        this.dialogRef.close();
        this.router.navigate(['/process-type-version-config', this.idVersion]);


      },
      error: error => {
        this.error = error;
      }
    });
  }
}

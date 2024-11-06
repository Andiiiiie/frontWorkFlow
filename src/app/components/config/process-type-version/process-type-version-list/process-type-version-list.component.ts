import {Component, Inject} from '@angular/core';
import {ProcessTypeVersion} from "../../../../models/process-type-version";
import {ProcessTypeVersionService} from "../../../../services/process-type-version.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-process-type-version-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './process-type-version-list.component.html',
  styleUrls: ['./process-type-version-list.component.css']
})
export class ProcessTypeVersionListComponent {
  id: number = 0;
  processTypeVersions: ProcessTypeVersion[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },private dialogRef: MatDialogRef<ProcessTypeVersionListComponent>,private processTypeVersionService: ProcessTypeVersionService,private router: Router) {
    console.log('Received ID:', data.id);
    this.id = data.id;
    this.setProcessTypeVersions();
  }

  setProcessTypeVersions()
  {
    if(this.id)
    {
      this.processTypeVersionService.getVersionsList(this.id).subscribe({
        next: processTypeVersions => {
          this.processTypeVersions = processTypeVersions;
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

  validate(id:number) {
    this.processTypeVersionService.validate(id).subscribe({
      next: () => {
        this.setProcessTypeVersions();
      },
      error: error => {
        Swal.fire(
          'Erreur',
          error,
          'error'
        );
      }
    });
  }

  finalize(id:number) {
    this.processTypeVersionService.finalize(id).subscribe({
      next: () => {
        this.setProcessTypeVersions();
      },
      error: error => {
        Swal.fire(
          'Erreur',
          error,
          'error'
        );
      }
    });
  }

  configure(id:number) {
    this.router.navigate(['/process-type-version-config', id]);
    this.dialogRef.close(id);
  }


}

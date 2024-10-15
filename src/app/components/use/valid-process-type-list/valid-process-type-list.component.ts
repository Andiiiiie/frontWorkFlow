import {ChangeDetectorRef, Component} from '@angular/core';
import {ProcessType} from "../../../models/process-type";
import {ActivatedRoute, Router} from "@angular/router";
import {ProcessTypeService} from "../../../services/process-type.service";
import Swal from "sweetalert2";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ProcessTypeVersion} from "../../../models/process-type-version";
import {ProcessTypeVersionService} from "../../../services/process-type-version.service";
import {MatDialog} from "@angular/material/dialog";
import {ProcessFormComponent} from "../process/process-form/process-form.component";

@Component({
  selector: 'app-valid-process-type-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './valid-process-type-list.component.html',
  styleUrl: './valid-process-type-list.component.css'
})
export class ValidProcessTypeListComponent {
  processTypes: ProcessType[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private processTypeService:ProcessTypeService,private processTypeVersionService:ProcessTypeVersionService,private  cdr:ChangeDetectorRef ,private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setProcessTypes();
  }


  setProcessTypes(){
    this.processTypeService.getValidProcessTypes().subscribe({
      next: processTypes => {
        this.processTypes = processTypes;
        this.cdr.detectChanges();
      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error'
      })}
    });
  }

  addProcesss(idProcess: number) {
    this.processTypeVersionService.getLatestVersion(idProcess).subscribe({
      next: processTypeVersion => {
        const dialogRef = this.dialog.open(ProcessFormComponent,{data: {id: processTypeVersion.id}});

        dialogRef.afterClosed().subscribe(result => {
          this.setProcessTypes();
        });
      },
      error: error => {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error'
        });
      }
    });
  }

}

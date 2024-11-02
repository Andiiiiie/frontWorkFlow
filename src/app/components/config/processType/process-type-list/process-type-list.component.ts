import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProcessTypeService} from "../../../../services/process-type.service";
import {ProcessType} from "../../../../models/process-type";
import Swal from "sweetalert2";
import {MatIcon} from "@angular/material/icon";
import {
  ProcessTypeVersionFormComponent
} from "../../process-type-version/process-type-version-form/process-type-version-form.component";
import {MatDialog} from "@angular/material/dialog";
import {
  ProcessTypeVersionListComponent
} from "../../process-type-version/process-type-version-list/process-type-version-list.component";

@Component({
  selector: 'app-process-type-list',
  standalone: true,
  imports: [FormsModule,
    NgForOf,
    ReactiveFormsModule,
    RouterLink, NgIf],
  templateUrl: './process-type-list.component.html',
  styleUrls: ['./process-type-list.component.css']
})
export class ProcessTypeListComponent implements OnInit {
  processTypes: ProcessType[] = [];
  size: number = 1;
  page: number = 1;

  constructor(private route: ActivatedRoute, private router: Router, private processTypeService:ProcessTypeService,private  cdr:ChangeDetectorRef,private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.setProcessTypes();
  }

  setProcessTypes(){
    this.processTypeService.listProcessTypes(this.size,this.page).subscribe({
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

  setSize(size:number)
  {
    this.size = size;
    this.setProcessTypes();
  }

  next()
  {
    this.page++;
    this.setProcessTypes();
  }

  previous()
  {
    this.page--;
    this.setProcessTypes();
  }

  addVersion(id: number)
  {
    const dialogRef = this.dialog.open(ProcessTypeVersionFormComponent,{data: {id: id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

  seeVersions(id: number)
  {
    const dialogRef = this.dialog.open(ProcessTypeVersionListComponent,{data: {id: id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }



}

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Organism} from "../../../../models/organism";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {OrganismService} from "../../../../services/organism.service";
import Swal from "sweetalert2";
import {
  ProcessTypeVersionFormComponent
} from "../../process-type-version/process-type-version-form/process-type-version-form.component";
import {OrganismFormComponent} from "../organism-form/organism-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {OrganismOwnerFormComponent} from "../organism-owner-form/organism-owner-form.component";

@Component({
  selector: 'app-organism-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './organism-list.component.html',
  styleUrls: ['./organism-list.component.css']
})
export class OrganismListComponent implements OnInit {
  organisms: Organism[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private organismService:OrganismService,private  cdr:ChangeDetectorRef,private dialog: MatDialog) {
      this.setOrganisms();
  }

  ngOnInit(): void {
    this.setOrganisms();
  }

  setOrganisms(){
    this.organismService.getOrganisms().subscribe({
      next: organisms => {
        this.organisms = organisms;
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


  addOrganism()
  {
    const dialogRef = this.dialog.open(OrganismFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

  addOwner(id:number)
  {
    const dialogRef = this.dialog.open(OrganismOwnerFormComponent, {
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }


}

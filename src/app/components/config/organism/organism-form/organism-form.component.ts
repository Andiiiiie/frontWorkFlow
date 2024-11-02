import {Component, OnInit} from '@angular/core';
import {Organism} from "../../../../models/organism";
import {OrganismService} from "../../../../services/organism.service";
import {MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-organism-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './organism-form.component.html',
  styleUrls: ['./organism-form.component.css']
})
export class OrganismFormComponent  {
  newOrganism: Organism = {} as Organism;
  error:string|null=null;
  constructor(private dialogRef: MatDialogRef<OrganismFormComponent>,private organismService: OrganismService) {
  }

  onSubmit()
  {
    console.log('New Organism:', this.newOrganism);
    this.organismService.addOrganism(this.newOrganism).subscribe({
      next: organism => {
        console.log('Organism created:', organism);
        this.dialogRef.close();

      },
      error: error => {
        this.error = error;
      }
    });
  }
}

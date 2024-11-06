import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Organism} from "../../../../models/organism";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrganismService} from "../../../../services/organism.service";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-organism-owner-form',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './organism-owner-form.component.html',
  styleUrls: ['./organism-owner-form.component.css']
})
export class OrganismOwnerFormComponent {
  newOwner: User = {} as User;
  id: number = 0;
  organism:Organism = {} as Organism;
  error:string|null=null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },private dialogRef: MatDialogRef<OrganismOwnerFormComponent>,private organismService: OrganismService) {
    console.log('Received ID:', data.id);
    this.id = data.id;
    this.setOrganism(this.id);
  }

  setOrganism(id:number)
  {
    this.organismService.getOrganismById(id).subscribe({
      next: organism => {
        this.organism = organism;
      },
      error: error => {
        this.error = error;
    }
    });
  }

  onSubmit()
  {
    if(this.id!=0)
    {
      console.log('New Owner:', this.newOwner);
      this.organismService.addOwnerToOrganism(this.id,this.newOwner).subscribe({
        next: organism => {
          console.log('Owner created:', organism);
          this.dialogRef.close();

        },
        error: error => {
          this.error = error;
        }
      });
    }

  }
}

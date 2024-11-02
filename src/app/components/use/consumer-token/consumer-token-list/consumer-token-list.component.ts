import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProcessTypeService} from "../../../../services/process-type.service";
import {MatDialog} from "@angular/material/dialog";
import {ConsumerTokenService} from "../../../../services/consumer-token.service";
import {
  ProcessTypeVersionListComponent
} from "../../../config/process-type-version/process-type-version-list/process-type-version-list.component";
import {ConsumerTokenFormComponent} from "../consumer-token-form/consumer-token-form.component";
import {ConsumerToken} from "../../../../models/consumer-token";
import {Organism} from "../../../../models/organism";
import {AuthService} from "../../../../services/auth.service";
import {OrganismService} from "../../../../services/organism.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NotificationsComponent} from "../../../global/notifications/notifications.component";

@Component({
  selector: 'app-consumer-token-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NotificationsComponent
  ],
  templateUrl: './consumer-token-list.component.html',
  styleUrls:[ './consumer-token-list.component.css']
})
export class ConsumerTokenListComponent implements OnInit{
  tokens:ConsumerToken[]=[];
  organism:Organism={ } as Organism;
  constructor(private route: ActivatedRoute, private router: Router,private organismService:OrganismService,private authService:AuthService, private consumerTokenService:ConsumerTokenService,private  cdr:ChangeDetectorRef,private dialog: MatDialog) {
    this.setOrganism();
  }

  ngOnInit() {
    this.setOrganism();
  }

  setOrganism(){
    if(this.authService.getUserId()!==null)
    {
      this.organismService.getOrganismByOwner(this.authService.getUserId()).subscribe(
        {
          next: organism => {
            this.organism = organism;
            this.setTokens();
          },
          error: error => {
            console.log(error);
          }
        }
      );
    }

  }

  setTokens(){
    this.consumerTokenService.listTokens(this.organism.id).subscribe(
      {
        next: tokens => {
          this.tokens = tokens;
          this.cdr.detectChanges();
        },
        error: error => {
          console.log(error);
        }
      }
    );
  }


  addConsumerToken(){
    const dialogRef = this.dialog.open(ConsumerTokenFormComponent,{data: {id: this.organism.id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

  deleteToken(id:string){
    this.consumerTokenService.deleteToken(id).subscribe(
      {
        next: token => {
          this.setTokens();
        },
        error: error => {
          console.log(error);
        }
      }
    );
  }

  protected readonly Number = Number;
}

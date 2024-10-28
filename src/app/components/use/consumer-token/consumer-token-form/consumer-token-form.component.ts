import {Component, Inject} from '@angular/core';
import {ConsumerToken} from "../../../../models/consumer-token";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConsumerTokenService} from "../../../../services/consumer-token.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-consumer-token-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './consumer-token-form.component.html',
  styleUrl: './consumer-token-form.component.css'
})
export class ConsumerTokenFormComponent {
  newConsumerToken: ConsumerToken = {} as ConsumerToken;
  error: string = '';
  id: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },private dialogRef: MatDialogRef<ConsumerTokenFormComponent>,private consumerTokenService: ConsumerTokenService) {
    console.log('Received ID:', data.id);
    this.id = data.id;
  }

  onSubmit()
  {
    this.newConsumerToken.organismId=this.id;
    console.log('New Consumer Token:', this.newConsumerToken);
    this.consumerTokenService.createConsumerToken(this.newConsumerToken).subscribe({
      next: consumerToken => {
        console.log('Consumer Token created:', consumerToken);
        this.dialogRef.close();

      },
      error: error => {
        this.error = error;
      }
    });
  }
}

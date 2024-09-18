import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-stepper',
  standalone: true,
  // imports: [],
  // templateUrl: './stepper.component.html',
  // styleUrl: './stepper.component.css'
  imports: [CommonModule, MatStepperModule, MatButtonModule],
  template: `
    <mat-horizontal-stepper>
      <mat-step label="Step 1">
        <p>First step content</p>
        <button mat-button matStepperNext>Next</button>
      </mat-step>
      <mat-step label="Step 2">
        <p>Second step content</p>
        <button mat-button matStepperNext>Next</button>
        <button mat-button matStepperPrevious>Back</button>
      </mat-step>
      <mat-step label="Step 3">
        <p>Third step content</p>
        <button mat-button matStepperPrevious>Back</button>
      </mat-step>
    </mat-horizontal-stepper>
  `
})
export class StepperComponent {

}

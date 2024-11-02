import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ExceptionResult} from "../../../../models/exception-result";
import {Process} from "../../../../models/process";
import {ProcessHistory} from "../../../../models/process-history";
import {ActivatedRoute, Router} from "@angular/router";
import {ProcessService} from "../../../../services/process.service";
import {Task} from "../../../../models/task";
import {ExceptionResultService} from "../../../../services/exception-result.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-process-perform',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    NgClass,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './process-perform.component.html',
  styleUrls: ['./process-perform.component.css']
})
export class ProcessPerformComponent implements OnInit {
  exceptions: ExceptionResult[] = [];
  process: Process = {} as Process;
  isLoading = false;
  error: string | null = null;
  id: number = 0;
  selectedExceptionId: number = -1;
  list: ProcessHistory[] = [];
  actualTask: Task = {} as Task;
  steps: any[] = [];
  activeSteps: Set<number> = new Set<number>();

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private processService: ProcessService,
    private exceptionResultService: ExceptionResultService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(<string>params.get('id'));
      if (this.id) {
        this.isLoading = true;
        this.setProcess();
      }
    });

    this.steps = this.list.map((step, index) => ({
      label: step.taskName,
      command: (event: any) => {
        if (this.activeSteps.has(index)) {
          this.activeSteps.delete(index);
        } else {
          this.activeSteps.add(index);
        }
      }
    }));
  }

  setProcess() {
    if (this.id) {
      this.processService.getById(this.id).subscribe({
        next: process => {
          this.process = process;
          this.setActualTask();
          this.setHistory();
          this.cdr.detectChanges();
        },
        error: error => {
          console.error(error);
          this.error = "Erreur lors du chargement du processus";
        }
      });
    }
  }

  setHistory() {
    if (this.id) {
      this.processService.getHistoric(this.id).subscribe({
        next: history => {
          this.list = history;
          this.cdr.detectChanges();
        },
        error: error => {
          console.error(error);
          this.error = "Erreur lors du chargement de l'historique";
        }
      });
    }
  }

  setExceptions() {
    if (this.id) {
      if (this.actualTask != null) {
        console.log("hehe ato ee" + this.actualTask.id);
        this.exceptionResultService.getExceptionsByTask(this.actualTask.id).subscribe({
          next: exceptions => {
            this.exceptions = exceptions;
            this.cdr.detectChanges();
          },
          error: error => {
            console.error(error);
            this.error = "Erreur lors du chargement des exceptions";
          }
        });
      }
    }
  }

  setActualTask() {
    console.log(this.id + " ito");
    if (this.id) {
      this.processService.getActualTask(this.id).subscribe({
        next: task => {
          this.actualTask = task;
          console.log("ito ilay izy");
          console.log(task);
          this.isLoading = false;
          if (task != null) {
            this.setExceptions();
          }
        },
        error: error => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
    }
  }

  next() {
    if (this.id) {
      this.processService.next(this.id, this.selectedExceptionId);
      this.setProcess();
    }
  }
}

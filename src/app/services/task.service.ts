import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../app.component";
import {catchError, map} from "rxjs/operators";
import {throwError,Observable} from "rxjs";
import {StepService} from "./step.service";
import { Task } from "../models/task";
import {Step} from "../models/step";
import {Resulter} from "../models/resulter";
import {ProcessTypeService} from "./processType.service";

@Injectable({ providedIn: 'root'})
export class TaskService{
  constructor(private http: HttpClient,private stepService:StepService,private processTypeService : ProcessTypeService) {}

    createTask(item: Task): Observable<any> {
        return this.http.post<any>(`${API_URL}/tasks`, item, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            observe: 'response'
        }).pipe(
            catchError(this.handleError)
        );
    }

    getTasksByStep(idStep: string) : Observable<Task[]> {
        return this.http.get<any>(`${API_URL}/tasks/step/${idStep}`).pipe(
            map(response => response.data as Task[])
        )
    }

    getTaskById(idTask:string): Observable<Task>{
        return this.http.get<any>(`${API_URL}/tasks/${idTask}`).pipe(
            map(response => response.data as Task)
        )
    }



    getStepsByTask(idTask:string): Observable<Step[]>
    {
      return this.http.get<any>(`${API_URL}/tasks/steps/${idTask}`).pipe(
        map(response => response.data as Step[])
      )
    }

    getResulters(idTask:string): Observable<Resulter[]>
    {
      return this.http.get<any>(`${API_URL}/tasks/${idTask}/resulters`).pipe(
        map(response => response.data as Resulter[])
      )
    }

    saveResult(resulter: Resulter)
    {
      return this.http.post<any>(`${API_URL}/resulters`, resulter, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        observe: 'response'
      }).pipe(
        catchError(this.handleError)
      );

    }





  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError('Erreur lors de la création du processus');
  }

}

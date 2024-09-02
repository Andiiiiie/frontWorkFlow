import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../app.component";
import {catchError, map, Observable, throwError} from "rxjs";
import {ProcessFollower} from "../models/ProcessFollower";
import {ResultType} from "../models/resultType";
import { Task } from "../models/task";
import {Process} from "../models/process";

@Injectable({ providedIn: 'root'})
export class ProcessService {
  constructor(private http: HttpClient) {
  }

  getProcessById(id: number): Observable<Process> {
    return this.http.get<any>(`${API_URL}/processes/${id}`).pipe(
      map(response => response.data as Process)  // Assurez-vous que response.data est de type ProcessType
    );
  }


  createProcess(item: Process) {
    return this.http.post<any>(`${API_URL}/processes`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' // Pour obtenir la réponse complète
    }).pipe(
      catchError(this.handleError) // Gestion centralisée des erreurs
    );
  }

  getProcesses() :Observable<Process[]>
  {
    return this.http.get<any>(`${API_URL}/processes`).pipe(
      map(response => response.data as Process[])  // Assurez-vous que response.data est de type ProcessType
    )
  }


  getHistory(id: number): Observable<ProcessFollower[]> {
    return this.http.get<any>(`${API_URL}/processes/history/${id}`).pipe(
      map(response => response.data as ProcessFollower[])  // Assurez-vous que response.data est de type ProcessType
    )
  }

  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError('Erreur lors de la création du processus');
  }


  getOptions(id:number): Observable<ResultType[]>
  {
    return this.http.get<any>(`${API_URL}/processes/options/${id}`).pipe(
      map(response => response.data as ResultType[])  // Assurez-vous que response.data est de type ProcessType
    )
  }

  getLocation(id: number): Observable<Task> {
    return this.http.get<any>(`${API_URL}/processes/location/${id}`).pipe(
      map(response => {
        if (response.data === null) {
          return {} as Task; // Return an empty Task object
        }
        return response.data as Task;
      })
    );
  }

  finish(idProcess: number, idResult: number,idTask: number): Observable<ProcessFollower> {
    return this.http.get<any>(`${API_URL}/processes/finish/idProcess/${idProcess}/idTask/${idTask}/idResult/${idResult}`).pipe(
      map(response => response.data as ProcessFollower )  // Assurez-vous que response.data est de type ProcessType
    )
  }

  getByTask(idTask:String): Observable<Process[]>
  {
    return this.http.get<any>(`${API_URL}/tasks/processes/${idTask}`).pipe(
      map(response => response.data as Process[])  // Assurez-vous que response.data est de type ProcessType
    )
  }
}

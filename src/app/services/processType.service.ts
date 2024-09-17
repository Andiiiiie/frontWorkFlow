import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../app.component";
import {catchError, map} from "rxjs/operators";
import {throwError,Observable} from "rxjs";
import {ProcessType} from "../models/processType";
import { Task } from "../models/task";

@Injectable({ providedIn: 'root'})
export class ProcessTypeService{
  constructor(private http: HttpClient) {}


  createProcessType(item: ProcessType): Observable<any> {
    // return this.http.post<ProcessType>(`${API_URL}/processType`, item);
    return this.http.post<any>(`${API_URL}/processTypes`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' // Pour obtenir la réponse complète
    }).pipe(
      catchError(this.handleError) // Gestion centralisée des erreurs
    );
  }

  // getProcessTypes(): Observable<ProcessType[]> {
  //   return this.http.get<ProcessType[]>(`${API_URL}/processTypes`);
  // }

  getProcessTypes(): Observable<ProcessType[]> {
    return this.http.get<any>(`${API_URL}/processTypes`).pipe(
      map(response => response.data as ProcessType[]) // Convertit les données de réponse en tableau de ProcessType
    );
  }


  getProcessTypesWithPagination(size:number,page:number): Observable<ProcessType[]> {
    return this.http.get<any>(`${API_URL}/processTypes?page=${page}&size=${size}`).pipe(
      map(response => response.data as ProcessType[]) // Convertit les données de réponse en tableau de ProcessType
    );
  }


  getProcessTypesByStateAndPagination(state: string,size:number,page:number): Observable<ProcessType[]> {
    return this.http.get<any>(`${API_URL}/processTypes/state?state=${state}&page=${page}&size=${size}`).pipe(
      map(response => response.data as ProcessType[]) // Convertit les données de réponse en tableau de ProcessType
    );
  }

  getProcessTypesByState(state: string): Observable<ProcessType[]> {
    return this.http.get<any>(`${API_URL}/processTypes/state?state=${state}`).pipe(
      map(response => response.data as ProcessType[]) // Convertit les données de réponse en tableau de ProcessType
    );
  }

  // getProcessTypesById(id: string | null): Observable<ProcessType> {
  //   return this.http.get<any>(`${API_URL}/processTypes/${id}`).pipe(
  //     map(response => response.data as Observable<ProcessType>)
  //   );
  // }

  getProcessTypesById(id: string | null): Observable<ProcessType> {
    return this.http.get<any>(`${API_URL}/processTypes/${id}`).pipe(
      map(response => response.data as ProcessType)  // Assurez-vous que response.data est de type ProcessType
    );
  }

  finalizeConfiguration(id: string | null){
    return this.http.get<any>(`${API_URL}/processTypes/${id}/finalize`).pipe(
      map(response => response.data as ProcessType)  // Assurez-vous que response.data est de type ProcessType
    );
  }

  getTasks(id:string |null): Observable<Task[]>
  {
    return this.http.get<any>(`${API_URL}/processTypes/${id}/tasks`).pipe(
      map(response => response.data as Task[])  // Assurez-vous que response.data est de type ProcessType
    );
  }

  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError('Erreur lors de la création du processus');
  }


  getTotalConfiguratedProcessTypes(): Observable<number> {
    return this.http.get<any>(`${API_URL}/processTypes/totalConfiguratedProcesseTypes`).pipe(
      map(response => response.data as number) // Convertit les données de réponse en tableau de ProcessType
    );
  }

  getTotalOnGoingConfigurationProcessTypes(): Observable<number> {
    return this.http.get<any>(`${API_URL}/processTypes/totalOnGoingConfigurationProcessTypes`).pipe(
      map(response => response.data as number) // Convertit les données de réponse en tableau de ProcessType
    );
  }
}

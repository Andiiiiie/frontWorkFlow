import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../app.component";
import {catchError, map, Observable, throwError} from "rxjs";
import {Step} from "../models/step";

@Injectable({ providedIn: 'root'})
export class StepService{
  constructor(private http: HttpClient) {}


  // createProcessType(item: ProcessType): Observable<any> {
  //   // return this.http.post<ProcessType>(`${API_URL}/processType`, item);
  //   return this.http.post<any>(`${API_URL}/processTypes`, item, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     observe: 'response' // Pour obtenir la réponse complète
  //   }).pipe(
  //     catchError(this.handleError) // Gestion centralisée des erreurs
  //   );
  // }
  //
  // // getProcessTypes(): Observable<ProcessType[]> {
  // //   return this.http.get<ProcessType[]>(`${API_URL}/processTypes`);
  // // }
  //
  // getProcessTypes(): Observable<ProcessType[]> {
  //   return this.http.get<any>(`${API_URL}/processTypes`).pipe(
  //     map(response => response.data as ProcessType[]) // Convertit les données de réponse en tableau de ProcessType
  //   );
  // }

  // getProcessTypesById(id: string | null): Observable<ProcessType> {
  //   return this.http.get<any>(`${API_URL}/processTypes/${id}`).pipe(
  //     map(response => response.data as Observable<ProcessType>)
  //   );
  // }

  createStep(item: Step): Observable<any> {
    return this.http.post<any>(`${API_URL}/steps`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' // Pour obtenir la réponse complète
    }).pipe(
      catchError(this.handleError) // Gestion centralisée des erreurs
    );
  }

  updateStep(item: Step): Observable<any> {
    return this.http.put<any>(`${API_URL}/steps/${item.idStep}`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' // Pour obtenir la réponse complète
    }).pipe(
      catchError(this.handleError) // Gestion centralisée des erreurs
    );
  }

  getStepById(id: string | null): Observable<Step> {
    return this.http.get<any>(`${API_URL}/steps/${id}`).pipe(
      map(response => response.data as Step)
    );
  }

  getStepsByProcessTypeId(id: string | null): Observable<Step[]> {
    return this.http.get<any>(`${API_URL}/steps/${id}/processType`).pipe(
      map(response => response.data as Step[])  // Assurez-vous que response.data est de type ProcessType
    );

  }

  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError('Erreur lors de la création du processus');
  }
}

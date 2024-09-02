import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {API_URL} from "../app.component";
import {ResultType} from "../models/resultType";

@Injectable({ providedIn: 'root'})
export class ResultTypeService{
  constructor(private http: HttpClient){}

  getResultTypes():Observable<ResultType[]>{
    return this.http.get<any>(`${API_URL}/resultTypes`).pipe(
      map(response => response.data as ResultType[])
    )
  }


  getResultTypesById(id: string | null): Observable<ResultType> {
    return this.http.get<any>(`${API_URL}/resultTypes/${id}`).pipe(
      map(response => response.data as ResultType)
    )
  }

  createResultType(item:ResultType): Observable<any>
  {
    return this.http.post<any>(`${API_URL}/resultTypes`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' // Pour obtenir la réponse complète
    }).pipe(
      catchError(this.handleError) // Gestion centralisée des erreurs
    );
  }


  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError('Erreur lors de la création du processus');
  }
}

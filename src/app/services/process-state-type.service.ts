import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProcessStateType} from "../models/process-state-type";
import {API_URL} from "../app.component";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ProcessType} from "../models/process-type";

@Injectable({
  providedIn: 'root'
})
export class ProcessStateTypeService {

  constructor(private http:HttpClient) { }


  getAll():Observable<ProcessStateType[]>
  {
    return this.http.get<any>(`${API_URL}/processStateTypes`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessStateType[];
      }),
      catchError(this.handleError)
    );

  }

  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError(error);
  }
}

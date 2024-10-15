import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ProcessType} from "../models/process-type";
import {API_URL} from "../app.component";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProcessTypeService {

  constructor(private http:HttpClient) { }

  createProcessType(item: ProcessType): Observable<ProcessType> {
    return this.http.post<any>(`${API_URL}/admin/processTypes`, item).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessType;
      }),
      catchError(this.handleError),

    );
  }

  listProcessTypes(size:number,page:number): Observable<ProcessType[]> {
    return this.http.get<any>(`${API_URL}/admin/processTypes?size=${size}&page=${page}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessType[];
      }),
      catchError(this.handleError)
    );
  }


  getProcessType(id:number): Observable<ProcessType> {
    return this.http.get<any>(`${API_URL}/admin/processTypes/${id}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessType;
      }),
      catchError(this.handleError)
    );
  }


  getValidProcessTypes(): Observable<ProcessType[]> {
    return this.http.get<any>(`${API_URL}/admin/processTypes/valid`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessType[];
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError(error);
  }


}

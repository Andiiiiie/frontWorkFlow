import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExceptionResult} from "../models/exception-result";
import {Observable, throwError} from "rxjs";
import {API_URL} from "../app.component";
import {catchError, map} from "rxjs/operators";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class ExceptionResultService {

  constructor(private http:HttpClient) { }

  createExceptionResult(item:ExceptionResult): Observable<ExceptionResult> {
    return this.http.post<any>(`${API_URL}/exceptionResults`, item).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ExceptionResult;
      }),
      catchError(this.handleError)

    );
  }

  updateExceptionResult(item:ExceptionResult):Observable<ExceptionResult>
  {
    return this.http.put<any>(`${API_URL}/exceptionResults`, item).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ExceptionResult;
      }),
      catchError(this.handleError)

    );
  }

  getExceptionsByTask(id:number):Observable<ExceptionResult[]>
  {
    return this.http.get<any>(`${API_URL}/exceptionResults/task/${id}`).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ExceptionResult[];
      }),
      catchError(this.handleError)
    );
  }



  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError(error);
  }
}

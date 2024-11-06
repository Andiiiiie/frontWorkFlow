import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Process} from "../models/process";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {API_URL} from "../app.component";
import {ProcessHistory} from "../models/process-history";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http:HttpClient) { }

  createProcess(process: Process): Observable<Process> {
    return this.http.post<any>(`${API_URL}/owner/process`, process).pipe(
      map(response => {
        if(response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Process;
      }),
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError(error);
  }


  listProcessType(page: number, size: number, state?: number, type?: number): Observable<Process[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (state !== undefined) {
      params = params.set('state', state.toString());
    }

    if (type !== undefined) {
      params = params.set('type', type.toString());
    }

    return this.http.get<any>(`${API_URL}/owner/process`, { params }).pipe(
      map(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Process[];
      }),
      catchError(this.handleError)
    );
  }


  getHistoric(id:number):Observable<ProcessHistory[]>
  {
    return this.http.get<any>(`${API_URL}/owner/process/history/${id}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessHistory[];
      }),
      catchError(this.handleError));
  }


  getById(id:number)
  {
    return this.http.get<any>(`${API_URL}/owner/process/${id}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as Process;
      }),
      catchError(this.handleError));
  }

  next(id:number,resultId:number)
  {
    this.http.get<any>(`${API_URL}/owner/process/next/${id}/${resultId}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as Process;
      }),
      catchError(this.handleError)
    ).subscribe();
  }


  getActualTask(id:number):Observable<Task>{
    return this.http.get<any>(`${API_URL}/owner/process/actual/${id}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as Task;
      }),
      catchError(this.handleError));
  }

  stop(id:number)
  {
    return this.http.get<any>(`${API_URL}/owner/process/stop/${id}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as Process;
      }),
      catchError(this.handleError));
  }

}


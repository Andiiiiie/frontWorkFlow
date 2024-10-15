import { Injectable } from '@angular/core';
import {Step} from "../models/step";
import {Observable, throwError} from "rxjs";
import {API_URL} from "../app.component";
import {catchError, map} from "rxjs/operators";
import {ProcessType} from "../models/process-type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private http:HttpClient) {

  }

  addStep(item:Step): Observable<Step> {
    return this.http.post<any>(`${API_URL}/steps`, item).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as Step;
      }),
      catchError(this.handleError)
    );
  }

  listStep(id:number): Observable<Step[]> {
     return this.http.get<any>(`${API_URL}/steps/processTypeVersion/${id}`).pipe(
      map(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Step[];
      }),
      catchError(this.handleError)
    );
  }

  updateStep(item:Step): Observable<Step> {
    return this.http.put<any>(`${API_URL}/steps`, item).pipe(
      map(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Step;
      }),
      catchError(this.handleError)
    );
  }

  getStepById(id:number): Observable<Step> {
    return this.http.get<any>(`${API_URL}/steps/${id}`).pipe(
      map(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as Step;
      }),
      catchError(this.handleError)
    );
  }




  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}

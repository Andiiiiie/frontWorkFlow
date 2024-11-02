import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ProcessCountByMonth} from "../models/stat/process-count-by-month";
import {API_URL} from "../app.component";
import {catchError, map} from "rxjs/operators";
import {ProcessCountByState} from "../models/stat/process-count-by-state";
import {ProcessTypeVersionCount} from "../models/stat/process-type-version-count";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http:HttpClient) { }

  getProcessCountByMonth(year:number,idType:number): Observable<ProcessCountByMonth[]> {
    return this.http.get<any>(`${API_URL}/stat/processCountByMonth?idType=${idType}&year=${year}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessCountByMonth[];
      }),
      catchError(this.handleError)
    );
  }

  getProcessCountByState(): Observable<ProcessCountByState[]> {
    return this.http.get<any>(`${API_URL}/stat/processCountByState`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessCountByState[];
      }),
      catchError(this.handleError)
    );
  }

  getProcessCountByStateFilter(idType:number): Observable<ProcessCountByState[]> {
    return this.http.get<any>(`${API_URL}/stat/processCountByState?idType=${idType}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessCountByState[];
      }),
      catchError(this.handleError)
    );
  }


  getProcessTypeVersionStat(dateTime:String):Observable<ProcessTypeVersionCount[]>
  {
    return this.http.get<any>(`${API_URL}/stat/processVersionCount?dateTime=${dateTime}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessTypeVersionCount[];
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError(error);
  }

}

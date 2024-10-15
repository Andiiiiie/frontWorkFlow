import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ProcessTypeVersion} from "../models/process-type-version";
import {API_URL} from "../app.component";
import {catchError, map} from "rxjs/operators";
import {ProcessType} from "../models/process-type";
import {ProcessTypeVersionInfo} from "../models/process-type-version-info";

@Injectable({
  providedIn: 'root'
})
export class ProcessTypeVersionService {

  constructor(private http:HttpClient) { }


  createVersion(item: ProcessTypeVersion) {
    return this.http.post<any>(`${API_URL}/processTypeVersions`, item).pipe(
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

  getVersionById(id:number): Observable<ProcessTypeVersion> {
    return this.http.get<any>(`${API_URL}/processTypeVersions/${id}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessTypeVersion;
      }),
      catchError(this.handleError)
    );
  }



  getVersionsList(id:number) {
    return this.http.get<any>(`${API_URL}/processTypeVersions/type/${id}`).pipe(
      map(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ProcessTypeVersion[];
      }),
      catchError(this.handleError)
    );
  }

  finalize(id:number){
    return this.http.get<any>(`${API_URL}/processTypeVersions/finalize/${id}`).pipe(
      map(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ProcessTypeVersion;
      }),
      catchError(this.handleError)
    );
  }

  validate(id:number){
    return this.http.get<any>(`${API_URL}/processTypeVersions/validate/${id}`).pipe(
      map(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response.data as ProcessTypeVersion;
      }),
      catchError(this.handleError)
    );
  }


  getLatestVersion(id:number): Observable<ProcessTypeVersion> {
    return this.http.get<any>(`${API_URL}/processTypeVersions/latest/${id}`).pipe(
      map(response =>
      {
        if(response.status=== 'error')
        {
          throw new Error(response.message);
        }
        return response.data as ProcessTypeVersion;
      }),
      catchError(this.handleError)
    );
  }





  private handleError(error: any) {
    console.error('Erreur de l\'API :', error);
    return throwError(error);
  }
}

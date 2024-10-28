import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ResultType} from "../models/result-type";
import {Observable, throwError} from "rxjs";
import {API_URL} from "../app.component";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ResultTypeService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<ResultType[]> {
    return this.http.get<any>(`${API_URL}/resultTypes`).pipe(
      map(response=>response.data as ResultType[])
    );
  }

  create(resultType: ResultType): Observable<ResultType> {
    return this.http.post<ResultType>(`${API_URL}/admin/resultTypes`, resultType).pipe(
      catchError(this.handleError)
    );
  }

  update(resultType: ResultType): Observable<ResultType> {
    return this.http.put<ResultType>(`${API_URL}/admin/resultTypes`, resultType).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/admin/resultTypes/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // getById(id: number): Observable<ResultType> {
  //   return this.http.get<ResultType>(`${API_URL}/admin/resultTypes/${id}`).pipe(
  //     map(response => response. as ResultType),
  //     catchError(this.handleError)
  //   );
  // }
  getById(id: number): Observable<ResultType> {
    return this.http.get<any>(`${API_URL}/admin/resultTypes/${id}`).pipe(
      map(response => response.data as ResultType),
      catchError(this.handleError)
    );
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }



}

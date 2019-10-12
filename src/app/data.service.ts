import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import {IEntityDef} from './classes/IEntityDef';
import {IEntity} from './classes/IEntity';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    endpoint:string = 'http://localhost:4001/api/';
    httpOptions:any = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    entityDefs:IEntityDef[];

    constructor(private http: HttpClient) {
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead

          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
    
    
    getEntityDefs(): Observable<IEntityDef[]> {
        return this.http.get<IEntityDef[]>(this.endpoint + 'entity-defs').pipe(
                catchError(this.handleError<any>('getEntityDefs'))
        );
    }
    
    getEntity(uuid): Observable<IEntity> {
        return this.http.get<IEntity>(this.endpoint + 'entities/' + uuid);
    }
    
    addProduct (entityDef:IEntityDef): Observable<IEntityDef> {
        console.log(entityDef);
        return this.http.post<IEntityDef>(this.endpoint + 'products', JSON.stringify(entityDef), this.httpOptions).pipe(
          tap((product) => console.log(`added product w/ id=${entityDef.uuid}`)),
          catchError(this.handleError<any>('addProduct'))
        );
      }
    updateProduct (id, product): Observable<any> {
        return this.http.put(this.endpoint + 'products/' + id, JSON.stringify(product), this.httpOptions).pipe(
          tap(_ => console.log(`updated product id=${id}`)),
          catchError(this.handleError<any>('updateProduct'))
        );
      }
    deleteProduct (id): Observable<any> {
        return this.http.delete<any>(this.endpoint + 'products/' + id, this.httpOptions).pipe(
          tap(_ => console.log(`deleted product id=${id}`)),
          catchError(this.handleError<any>('deleteProduct'))
        );
      }
}

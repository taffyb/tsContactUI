import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
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
        console.log(`httpClientError: ${JSON.stringify(result)}`);
        return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead

          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
    
    
    private getEDefs(): Observable<IEntityDef[]> {
        return this.http.get<IEntityDef[]>(this.endpoint + 'entity-defs');
    }
    
    async getEntityDef(type:string){
        const entityDefs = await this.getEDefs().toPromise();
        let entityDef:IEntityDef;     
//        console.log(`getEntityDef.entityDefs : ${JSON.stringify(entityDefs) } ${entityDefs.length }`);
        for(let i=0;i<entityDefs.length;i++){
//            console.log(`getEntityDef type: ${type} entityDefs[i].name:${entityDefs[i].name}`);
            if(entityDefs[i].name==type){
                entityDef=entityDefs[i];
            }
        }
        return entityDef;
    }
    
    getEntity(uuid): Observable<IEntity> {
        return this.http.get<IEntity>(this.endpoint + 'entities/' + uuid);
    }
    
    addEntity (entity:IEntity): Observable<any> {
        console.log(`addEntity.entity : ${JSON.stringify(entity) } \n ${this.endpoint + 'entities'}`);
        let observable = this.http.post(this.endpoint + 'entities', JSON.stringify(entity), this.httpOptions).pipe(
                tap((product) => console.log(`added entity w/ id=${entity.uuid}`)),
                catchError(this.handleError<any>('addEntity'))
              );
        console.log(`addEntity.entity return`);
        return observable;
      }
    updateEntity (entity:IEntity): Observable<any> {
        console.log(`updateEntity: endpoint=${this.endpoint + 'entities/' + entity.uuid} \nentity:${JSON.stringify(entity)}`);
//        return this.http.put(this.endpoint + 'entities/' + entity.uuid, JSON.stringify(entity), this.httpOptions).pipe(
//          tap(_ => console.log(`updated entity id=${entity.uuid}`)),
//          catchError(this.handleError<any>('updateEntity'))
//        );
        return this.http
            .put(this.endpoint + 'entities/' + entity.uuid, JSON.stringify(entity), this.httpOptions)
            .pipe(
                    catchError((error: HttpErrorResponse) => {
                      if (error.error instanceof Error) {
                        // A client-side or network error occurred. Handle it accordingly.
                        console.log('An error occurred:', error.error.message);
                      } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
                      }

                      // If you want to return a new response:
                      //return of(new HttpResponse({body: [{name: "Default value..."}]}));

                      // If you want to return the error on the upper level:
                      //return throwError(error);

                      // or just return nothing:
                      return EMPTY;
                    })
                  );
      }
    deleteEntity (euuid): Observable<any> {
        return this.http.delete<any>(this.endpoint + 'entities/' + euuid, this.httpOptions).pipe(
          tap(_ => console.log(`deleted entity.uuid=${euuid}`)),
          catchError(this.handleError<any>('deleteProduct'))
        );
      }
}

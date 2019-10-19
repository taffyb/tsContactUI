import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, EMPTY, observable } from 'rxjs';
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
        console.log('Get Entity Defs');
        return this.http.get<IEntityDef[]>(this.endpoint + 'entity-defs');
    }

    
    getEntityDefs(type:string):Promise<IEntityDef[]>{
        return new Promise<IEntityDef[]>(async (resolve,reject)=>{
            if(!this.entityDefs){
                this.entityDefs = await this.getEDefs().toPromise();
            }
            resolve(this.entityDefs);
        });
    }
    
    getEntityDef(type:string):Promise<IEntityDef>{
        return new Promise<IEntityDef>(async (resolve,reject)=>{
            if(!this.entityDefs){
                this.entityDefs = await this.getEDefs().toPromise();
            }
            let entityDef:IEntityDef;
            for(let i=0;i<this.entityDefs.length;i++){
                if(this.entityDefs[i].name==type){
                    entityDef=this.entityDefs[i];
                }
            }
            if(entityDef){
                resolve(entityDef);
            }else{
                reject();
            }
        });
    }
    
    getEntity(uuid): Observable<IEntity> {
        return this.http.get<IEntity>(this.endpoint + 'entities/' + uuid);
    }
    
    addEntity (entity:IEntity): Observable<any> {
        return  this.http
            .post(this.endpoint + 'entities', JSON.stringify(entity), this.httpOptions).pipe(
                tap((product) => console.log(`added entity w/ id=${entity.uuid}`)),
                catchError(this.handleError<any>('addEntity'))
              );
      }
    updateEntity (entity:IEntity): Observable<any> {

        return this.http
            .put(this.endpoint + 'entities/' + entity.uuid, JSON.stringify(entity), this.httpOptions).pipe(
                tap((product) => console.log(`added entity w/ id=${entity.uuid}`)),
                catchError(this.handleError<any>('addEntity'))
              );
      }
    deleteEntity (euuid): Observable<any> {
        return this.http
            .delete<any>(this.endpoint + 'entities/' + euuid, this.httpOptions).pipe(
              tap(_ => console.log(`deleted entity.uuid=${euuid}`)),
              catchError(this.handleError<any>('deleteProduct'))
            );
      }
}

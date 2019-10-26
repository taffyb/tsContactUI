import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, EMPTY, observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import {IEntityDef} from './classes/IEntityDef';
import {IEntity} from './classes/IEntity';
import {IPropertyGroup} from './classes/IPropertyGroup';

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
    entityList:IEntity[];

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
        return this.http.get<IEntityDef[]>(this.endpoint + 'entity-defs').pipe(
                tap((product) => console.log(`data.service.getEDefs()`)),
                catchError(this.handleError<any>('getEDefs'))
              );
    }
    
    private getEntities(): Observable<IEntity[]> {
        return this.http.get<IEntity[]>(this.endpoint + 'entities').pipe(
                tap((product) => console.log(`data.service.getEntities()`)),
                catchError(this.handleError<any>('getEntities'))
              );
    }
    
    getEntityDefs():Promise<IEntityDef[]>{
        return new Promise<IEntityDef[]>(async (resolve,reject)=>{
            if(!this.entityDefs){
                this.entityDefs = await this.getEDefs().toPromise();
//                console.log(`entityDefs: ${JSON.stringify(this.entityDefs)}`);
            }
            resolve(this.entityDefs);
        });
    }
    getEntityDefGroups(type:string):Promise<string[]>{
        return new Promise<string[]>(async (resolve,reject)=>{
            let groupNames:string[]=[];
    
            if(!this.entityDefs){
                this.entityDefs = await this.getEDefs().toPromise();
            }
            let entityDef:IEntityDef;
            for(let i=0;i<this.entityDefs.length;i++){
                if(this.entityDefs[i].name==type){
                    entityDef=this.entityDefs[i];
                }
            }
            let groups:IPropertyGroup[]=entityDef.groups;
            groups.sort((a, b) => a.order - b.order);
            groups.forEach((g)=>{
                groupNames.push(g.name);
            });
            console.log(`entityDefs.groups: ${JSON.stringify(groupNames)}`);
            resolve(groupNames);
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

    getEntityList(forceRefresh:boolean=false):Promise<IEntity[]>{
        return new Promise<IEntity[]>(async (resolve,reject)=>{
            if((!this.entityList || this.entityList===null) || forceRefresh){
                this.entityList = await this.getEntities().toPromise();
            }
            resolve(this.entityList);
        });
    }
    getEntity(uuid): Observable<IEntity> {
        return this.http.get<IEntity>(this.endpoint + 'entities/' + uuid);
    }
    
    addEntity (entity:IEntity): Observable<any> {
        return  this.http
            .post(this.endpoint + 'entities', JSON.stringify(entity), this.httpOptions).pipe(
                tap((product) => console.log(`added entity  id=${entity.uuid}`)),
                catchError(this.handleError<any>('addEntity'))
              );
      }
    updateEntity (entity:IEntity): Observable<any> {

        return this.http
            .put(this.endpoint + 'entities/' + entity.uuid, JSON.stringify(entity), this.httpOptions).pipe(
                tap((product) => console.log(`updated entity  id=${entity.uuid}`)),
                catchError(this.handleError<any>('updateEntity'))
              );
      }
    deleteEntity (euuid): Observable<any> {
        this.entityList=null;
        return this.http
            .delete<any>(this.endpoint + 'entities/' + euuid, this.httpOptions).pipe(
              tap(_ => console.log(`deleted entity.uuid=${euuid}`)),
              catchError(this.handleError<any>('deleteEntity'))
            );        
      }
}

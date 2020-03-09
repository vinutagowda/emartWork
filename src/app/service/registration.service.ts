import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Registration } from '../model/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl:string;


  constructor(private httpClient :HttpClient) {
    this.baseUrl="http://localhost:8081/registrations";
   }
   getAll() : Observable<Registration []>{
    return this.httpClient.get<Registration []>(this.baseUrl);
   }
   getById(id:number) : Observable<Registration >{ 
    return this.httpClient.get<Registration>(`${this.baseUrl}/${id}`);
   }
   add(registration:Registration ) : Observable<Registration >{
     return this.httpClient.post<Registration >(this.baseUrl,registration);
   }
 
}

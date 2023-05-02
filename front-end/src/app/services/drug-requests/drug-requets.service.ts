import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ɵpublishDefaultGlobalUtils } from '@angular/core';
import { Observable } from 'rxjs';
import { DrugRequest } from 'src/app/models/DrugRequest';

import { headers, loggedInUser } from '../auth/auth.service';
import { User } from 'src/app/models/User';

// POST ne fonctionne pas présentement avec le faux serveur. PUT est utilisé temporairement.
const URL = "https://my-json-server.typicode.com/Eyeofthequeen/database-for-epharma/"

const URL_API = "http://localhost:8080/api/drug/requests/"

@Injectable({
  providedIn: 'root'
})
export class DrugRequetsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> { // /api/drug-requests/all
    return new Observable((observable) => {
      const url = URL_API + "all"
      const user: User = loggedInUser as User;
      const params = new HttpParams().set('email', user.email);
      this.http.get<any>(url, {params: params, observe: 'response', headers: headers}).subscribe({
        next: (rep) => { return observable.next(rep.body) }
      })
    })
  }

  create(drugRequest: DrugRequest): Observable<any> { // /api/drug-requests/create
    const url = URL_API + "save/for/closest/pharmacies"
    return new Observable((observable) => {
      this.http.post<any>(url, { ...drugRequest, user: loggedInUser }, {headers: headers}).subscribe({
        next: (rep) => { return observable.next(rep.body) },
        error: (error) => { return observable.error(error) }
      })
    }) 
  }

  respond(drugRequest: DrugRequest): Observable<any> {
      const url = URL_API + "save/response"
      const bool: boolean = (drugRequest.response?.hasGeneric as {gen: boolean}).gen
      drugRequest.response!.hasGeneric = bool;
      return new Observable((observable) => {
        this.http.post<any>(url, drugRequest, { headers: headers }).subscribe({
          next: (rep) => { return observable.next(rep.body) }
        })
      })
  }
}

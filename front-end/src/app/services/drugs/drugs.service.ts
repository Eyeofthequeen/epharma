import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Drug } from 'src/app/models/Drug';
import { headers } from '../auth/auth.service';

// POST ne fonctionne pas présentement avec le faux serveur. PUT est utilisé temporairement.
const URL = "https://my-json-server.typicode.com/eyeofthequeen/database-for-epharma/"

const URL_API = "http://localhost:8080/api/drugs/"

@Injectable({
  providedIn: 'root'
})
export class DrugsService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return new Observable((observable) => {
      const url = URL_API + "all"
      this.http.get<any>(url, {observe: 'response', headers: headers}).subscribe({
        next: (rep) => { return observable.next(rep.body) },
        error: (error) => { return observable.error(error) }
      })
    })
  }

  getById(id: number): Observable<any> {
    return new Observable((observable) => {
      const url = URL_API + "get/" + id
      this.http.get<any>(url, {observe: 'response', headers: headers}).subscribe({
        next: (rep) => {
          return observable.next(rep.body)
        }
      })
    })
  }

  getAllNames(): Observable<any> {
    const url = URL_API + "all/names"
    return new Observable((observable) => {
      this.http.get<any>(url, {observe: 'response', headers: headers}).subscribe({
        next: (rep) => { return observable.next(rep.body) },
        error: () => { return [] }
      })
    })
  }

  save(drug: Drug): Observable<any> {
    const url = URL_API + "save"
    return new Observable((observable) => {
      this.http.post(url, drug, {headers: headers}).subscribe({
        next: (rep) => { return observable.next(rep) },
        error: (error) => { return observable.error(error) }
      })
    })
  }
}

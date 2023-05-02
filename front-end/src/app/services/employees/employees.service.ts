import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/Employee';
import { headers } from '../auth/auth.service';

// POST ne fonctionne pas présentement avec le faux serveur. PUT est utilisé temporairement.
const URL = "https://my-json-server.typicode.com/eyeofthequeen/database-for-epharma/"

const URL_API = "http://localhost:8080/api/employees/"

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return new Observable((observable) => {
      const url = URL_API + "all"
      this.http.get<any>(url, {observe: 'response', headers: headers}).subscribe({
        next: (rep) => { return observable.next(rep.body) }
      })
    })
  }

  save(employee: Employee): Observable<any> {
    const url = URL_API + "save"
    return new Observable((observable) => {
      this.http.post(url, employee, {headers: headers}).subscribe({
        next: (rep) => { return observable.next(rep) },
        error: (error) => { return observable.error(error) }
      })
    })
  } 
}

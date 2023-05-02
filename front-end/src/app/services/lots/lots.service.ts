import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Lot } from 'src/app/models/Lot';
import { headers } from '../auth/auth.service';

// POST ne fonctionne pas présentement avec le faux serveur. PUT est utilisé temporairement.
const URL = "https://my-json-server.typicode.com/eyeofthequeen/database-for-epharma/"

const URL_API = "http://localhost:8080/api/lots/"

@Injectable({
  providedIn: 'root'
})
export class LotsService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return new Observable((observable) => {
      const url = URL_API + "all"
      const lots: Lot[] = []

      this.http.get<any>(url, {observe: 'response', headers: headers}).subscribe({
        next: (rep) => {

          (rep.body as []).forEach(rawLot => {
            const lot = rawLot as Lot
            lot.number = rawLot["id"]
            lots.push(lot)
          })
          return observable.next(lots)
        },
        error: (erreur) => { observable.next(erreur) }
      })
    })
  }

  getNextLotNumber() {
    const url = URL_API + "next/id"
    return new Observable((observable) => {
      this.http.get<any>(url, {headers: headers}).subscribe({
        next: (rep) => {
          return observable.next(rep)
        }
      })

    })
  }

  archive(lot: Lot): Observable<any> { // /api/lots/archive/{id}
    const url = URL + "lots/" + lot.number
    return this.http.delete(url)
  }

  save(lot: Lot): Observable<any> {
    const url = URL_API + "save"
    return new Observable((observable) => {
      this.http.post(url, lot, {headers: headers}).subscribe({
        next: (rep) => { return observable.next() }
      })
    })
  }
}
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Point } from 'src/assets/ts/obj/Point';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  
  constructor(private http: HttpClient) {}

  getLocalisation(): Observable<any> {
    return new Observable((observable) => {
      const succes: PositionCallback = (position: any) => { observable.next(position); }
      const erreur: PositionErrorCallback = (error) => { observable.error(error); }
  
      let watchId: number
      if ('geolocation' in navigator) {
          watchId = navigator.geolocation.watchPosition(succes, erreur)
      } else {
          erreur({code: 100, message: 'Pas d\'accès à la géolocalisation.', PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3})
      }
  
      const unsubscriber = () => { navigator.geolocation.clearWatch(watchId) }
      return unsubscriber
    })
  }

  getPartialAddress(): Observable<any> {
    return new Observable((observable) => {
      const erreur: PositionErrorCallback = (error) => { observable.error(error); }

      let watchId: number
      if ('geolocation' in navigator) {
        let url = 'https://api.ipgeolocation.io/ipgeo?apiKey=44c77742001a4f9c81dfbf4dda33b08f'
        this.http.get<any>(url, {observe: 'response'}).subscribe({
          next: (rep) => { observable.next(rep) },
          error: (erreur) => { observable.next(erreur)}
        })
      } else {
          erreur({code: 100, message: 'Pas d\'accès à la géolocalisation.', PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3})
      }
  
      const unsubscriber = () => { navigator.geolocation.clearWatch(watchId) }
      return unsubscriber
    })
  }

  // Juste un exemple pour l'examen en cas de POST
  savePosition(data: any): Observable<any> {
    const url = ''
    return this.http.post(url, data, {/* no options */}).pipe(retry(3),
      catchError((err, caught: Observable<any>) => {
          console.log("Error lors de la sauvegarde : " + err)
          return caught
      })
    )
  }

  distanceBetweenTwoPositions(point: Point, autrePoint: Point) {
    var R = 6371; // Radius de la terre en km
    var dLat = this.convertirEnRadian(autrePoint.latitude - point.latitude);
    var dLon = this.convertirEnRadian(autrePoint.longitude - point.longitude); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.convertirEnRadian(point.latitude)) * Math.cos(this.convertirEnRadian(autrePoint.latitude)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var distance = R * c; // Distance en km
    return distance;
  }

  private convertirEnRadian(deg: number) {
    return deg * (Math.PI/180)
  }
}

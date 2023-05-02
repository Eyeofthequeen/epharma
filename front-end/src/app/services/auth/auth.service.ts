import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role, TypeOfRegistering } from 'src/assets/ts/shared/constants';
import { User } from 'src/app/models/User';
import { Address } from 'src/app/models/Address';
import { Position } from 'src/app/models/Point';

const AUTH_API = "/api/auth/"
const URL_API = "http://localhost:8080/api/auth/"
const URL_USER_API = "http://localhost:8080/api/user/"
const USER_KEY_STORAGE = "usager"
const TOKENT_KEY_STORAGE = "jwtToken"

export const AUTH_MESSAGES = {} as { erreurs: string[] }
export let loggedInUser: User | null = null
export const headers = new HttpHeaders({
  'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  isProfessionnal(): boolean {
    return loggedInUser!.roles.includes(Role.Administration) || loggedInUser!.roles.includes(Role.UserAdmin);
  }

  loadUser() {
    if (localStorage.getItem(TOKENT_KEY_STORAGE)) {
      loggedInUser = JSON.parse(localStorage.getItem(USER_KEY_STORAGE) as string);
    }
  }

  login(email: string, password: string): Observable<any> {
    return new Observable((observable) => {
      const url = URL_API + "login"

      this.http.post(url, { email, password }).subscribe({
        next: (rep) => {
          const { user, token } = rep as { user: User, token: string }
          if (!user.address) { user.address = new Address(); }
          loggedInUser = user
          localStorage.setItem(USER_KEY_STORAGE, JSON.stringify(loggedInUser))
          localStorage.setItem(TOKENT_KEY_STORAGE, token);
          return observable.next(rep)
        },
        error: (error) => { return observable.error(error) }
      })
    })
  }

  logout() {
    return new Observable((observable) => {
      const url = AUTH_API + "logout"

      this.http.delete(url).subscribe({
          next: (rep) => {
            localStorage.removeItem(USER_KEY_STORAGE)
            localStorage.removeItem(TOKENT_KEY_STORAGE)
            loggedInUser = null
            return observable.next(rep)
          }
        }
      )
    })
  }

  register(email: string, password: string, type: TypeOfRegistering, position: Position): Observable<any> {
    return this.http.post(URL_API + "register", {
        email,
        password,
        type,
        position
    })
  }
    
  editing(data: User): Observable<any> {
    return new Observable((observable) => {
      const url = URL_USER_API + "save"

      this.http.post(url, data, { headers: headers }).subscribe({
        next: (rep) => {
          const { user, token } = rep as { user: User, token: string }
          loggedInUser = user
          localStorage.setItem(USER_KEY_STORAGE, JSON.stringify(loggedInUser))
          return observable.next(rep)
        },
        error: (erreur) => { observable.next(erreur) }
      })
    })
  }

  currentSession(): Observable<any> {
    return new Observable((observable) => {
      const url = AUTH_API + "current/session"
      
      this.http.get<any>(url, {observe: 'response'}).subscribe({
        next: (rep) => {
          loggedInUser = rep.body as User
          return observable.next(rep)
        },
        error: (erreur) => { observable.next(erreur)}
      })
    })
  }
}
    
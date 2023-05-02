import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Address } from 'src/app/models/Address';
import { Pharmacy } from 'src/app/models/Pharmacy';
import { User } from 'src/app/models/User';
import { Permission, Professionnal, TypeOfRegistering } from 'src/assets/ts/shared/constants';


const AUTH_API = "/api/auth/"
const USER_KEY = "usager", USERS_KEY = "users"
const POST = "POST", GET = "GET", DELETE = "DELETE"

let users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) as string)
let usager: User | null = null


@Injectable()
export class ServeurInterceptor implements HttpInterceptor {
  constructor() {}
  
  // Faux back-end
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, headers, body } = request
    return handlerRoute()
    
    function handlerRoute() {
      switch(true) {
        //case url.endsWith(AUTH_API  + "login") && method === POST:
        //  return login()
        case url.endsWith(AUTH_API + 'current/session') && method === GET:
          return currentSession()
        //case url.endsWith(AUTH_API + 'register') && method === POST:
        //  return register()
        case url.endsWith(AUTH_API + 'edit') && method === POST:
          return edit()
        case url.endsWith(AUTH_API + 'logout') && method === DELETE:
          return logout()
        default:
          //if (!isLoggedIn()) { return denied() }
          return next.handle(request)
        }
      }

    function login() {
      let auth = body as { email: string, password: string }
      if (users.length === 0) { return error("Tentez l'inscription.") }
      
      let user = users.find(usager => usager["email"] === auth.email && usager["password"] === auth.password) || null
      if (!user) { return error("Courriel ou mot de passe invalide.") }
      usager = user
      return ok(user)
    }
    
    function logout() {
      usager = null
      return ok()
    }
    
    function currentSession() {
      usager = JSON.parse(localStorage.getItem(USER_KEY) as string)
      console.log(usager)
      if (!isLoggedIn()) { return denied() }
      return ok(usager)
    }
    
    function edit() {
      if (!isLoggedIn()) { return denied() }
      let auth = body as User
      let user = users.find(usager => usager["email"] === auth.email) || null
      
      if(!user) { return error("Un usager inexistant ne peut être modifié.") }

      if(auth.firstName !== "" && auth.lastName !== "") {
        auth.username = auth.firstName[0].toLowerCase() + auth.lastName.toLowerCase()
      }
      Object.assign(user, auth)
      
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      return ok(user)
    }

    function isLoggedIn() {
      return usager != null
    }

    function denied() {
      return throwError(() => new HttpErrorResponse({status: 403, error: "Accès refusé."}))
    }

    function inaccessible() {
      return throwError(() => new HttpErrorResponse({status: 404, error: "Page inaccessible."}))
    }

    function ok(body?: any) {
      return of(new HttpResponse({status: 200, body}))
    }

    function error(message: string) {
      return throwError(() => new HttpErrorResponse({error: message}))
    }
  }
}

export const ServerProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServeurInterceptor,
  multi: true
}

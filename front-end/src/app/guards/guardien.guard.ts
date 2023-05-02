import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Permission, Role } from 'src/assets/ts/shared/constants';
import { User } from '../models/User';
import { AuthService, loggedInUser } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardienGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.auth.loadUser()
      const user = loggedInUser;

      if(!user) {
        // Redirection si l'usager n'est pas connecté.
        this.router.navigate(["/login"])
      } else {
        if(route.routeConfig?.path === 'administration' && !(user as User).roles.includes(Role.Administration)) {
          // Redirection si l'usager n'est pas un administrateur
          this.router.navigate([""])
        }

        if(!route.children.length && route.routeConfig?.children?.length) {
          // Redirection vers le premier enfant si la route est un parent et qu'elle possède des enfants
          this.router.navigate(["/" + route.routeConfig?.path + "/" + route.routeConfig?.children![0].path])
        }
      }

      return true
  }
  
}
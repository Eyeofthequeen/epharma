import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService, loggedInUser } from 'src/app/services/auth/auth.service'
import { Permission, Role } from 'src/assets/ts/shared/constants'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [AuthService]
})
export class NavigationComponent {

  constructor(private router: Router, private auth: AuthService) {}
  
  goToPath(path: string) {
    this.router.navigate([path])
  }

  username() {
    return loggedInUser?.username || null
  }

  isLoggedIn() {
    return loggedInUser !== null
  }

  isAdmin() {
    return loggedInUser?.roles.includes(Role.Administration) || loggedInUser?.roles.includes(Role.UserAdmin)
  }

  logout() {
    const logout$ = this.auth.logout().subscribe({
      next: () => { 
        this.router.navigateByUrl('/login')
      }
    })
    setTimeout(() => {logout$.unsubscribe()}, 5000)
  }
}

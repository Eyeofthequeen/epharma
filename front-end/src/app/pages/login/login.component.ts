import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, loggedInUser } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnDestroy, OnInit {
  private inscriptions: Subscription = new Subscription()
  erreurs: string[] = []
  
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(loggedInUser) {
      this.redirect()
    }
  }
  
  ngOnDestroy(): void {
    this.inscriptions.unsubscribe()
  }

  private redirect() {
    this.router.navigate([''])
  }

  login(formValues: any) {
    const { email, password } = formValues
    this.inscriptions.add(this.auth.login(email, password).subscribe({
      next: () => { this.redirect() },
      error: (error) => {
        this.erreurs = []
        this.erreurs.push(error.error)
      }
    }))
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Position } from 'src/app/models/Point';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalisationService } from 'src/app/services/localisation/localisation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnDestroy, OnInit {
  private subscriptions: Subscription = new Subscription()
  private position: Position = new Position()
  errors: string[] = []
  successes: string[] = []

  constructor (private auth: AuthService, private localisation: LocalisationService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.localisation.getLocalisation().subscribe({
      next: (position) => {
        // On récupère la position dès le début si l'usager nous le permet
        this.position = { longitude: position.coords.longitude, latitude: position.coords.latitude }
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  reset(): void {
    this.errors = []
    this.successes = []
  }

  register(formValues: any) {
    const { email, password, type } = formValues
    debugger
    this.subscriptions.add(this.auth.register(email, password, type, this.position).subscribe({
      next: () => {
        this.reset()
        this.successes.push("Inscription réussi.")
      },
      error: (error) => {
        this.reset()
        this.errors.push(error.error)
      }
    }))
  }
}

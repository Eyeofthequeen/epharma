import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { Alert } from 'src/assets/ts/obj/Alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app-inf1013-epharma'
  alerts = [
    new Alert("Alerte profil incomplet", "Vous devez compléter votre profil avant d'effectuer des requêtes."),
    new Alert("Nouvelle requête", "Réception d'une nouvelle requête.")
  ]

  constructor() {
    this.alerts = [] // TEMPORAIRE
  }

  removeAlert(alert: Alert) {
    delete this.alerts[this.alerts.indexOf(alert)]
    this.alerts = this.alerts.filter((a, _) => a != null)
  }
}

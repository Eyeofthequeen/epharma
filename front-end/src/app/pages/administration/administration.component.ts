import { Component, OnInit } from '@angular/core';
import { loggedInUser } from 'src/app/services/auth/auth.service';
import { Permission, Role } from 'src/assets/ts/shared/constants';

@Component({
  selector: 'page-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  pages: {[id: string]: string} = {
    alerts: "Alertes",
    drugs: "Médicaments",
    requetes: "Requêtes"
  }

  ngOnInit(): void {
    if (loggedInUser?.roles.includes(Role.Administration)) {
      this.pages["employees"] = "Employés"
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Permission, Role, TypeOfDrug } from 'src/assets/ts/shared/constants'
import { loggedInUser } from 'src/app/services/auth/auth.service';
import { Drug } from 'src/app/models/Drug';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() drug: Drug

  @Output() OnRequest = new EventEmitter<Drug>()

  private removeAccent(): string {
    return this.drug.type.replace('é', 'e')
  }

  getIcon(): string {
    return this.removeAccent() + ".svg"
  }

  getType(): string {
    return this.removeAccent()
  }

  allowedMoreInfo() {
    return loggedInUser?.roles.includes(Role.Administration) || loggedInUser?.roles.includes(Role.UserAdmin)
  }

  allowedDrugRequest() {
    return loggedInUser?.roles.includes(Role.User)
  }

  request() {
    this.OnRequest.emit(this.drug)
  }
}

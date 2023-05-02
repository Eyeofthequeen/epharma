import { Component, OnInit } from '@angular/core';
import { FieldDirector } from 'src/assets/ts/obj/Field';
import { Actions, Availability, Availabilities, Headers, TypeOfFieldHTML, TypeOfDrug } from 'src/assets/ts/shared/constants';
import { Filtrable, Filter } from 'src/assets/ts/abstracts/Filtrable';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Form } from 'src/assets/ts/obj/Form';
import { DrugRequetsService } from 'src/app/services/drug-requests/drug-requets.service';
import { DrugRequest, Response } from 'src/app/models/DrugRequest';

@Component({
  selector: 'app-requetes',
  templateUrl: './requetes.component.html',
  styleUrls: ['./requetes.component.scss'],
  providers: [ValidationService]
})

export class RequetesComponent extends Filtrable implements OnInit {
  private requests: DrugRequest[] = []
  currentDrugRequest: DrugRequest | null = null
  consult = Actions.Consult
  keysToIgnore = ["description", "id", "price", "total"]
  headers = [Headers.Drug, Headers.Concentration, Headers.Type, Headers.Date, Headers.Quantity, Headers.Email, Headers.FirstName, Headers.LastName, Headers.Telephon]
  queryForm: Form

  constructor(private validation: ValidationService, private drugRequestService: DrugRequetsService) { super() }

  ngOnInit(): void {
    this.initForms()
    this.drugRequestService.getAll().subscribe({
      next: (rep) => {
        this.requests = rep
        this.list = rep
      }
    })
  }

  private initForms() {
    this.queryForm = new Form([
      FieldDirector.checkbox("hasGeneric", "", {gen: "Générique disponible"}, [], false),
      FieldDirector.checkbox("availability", "", Availabilities, [this.validation.onlyOneSelectedValidator(Object.keys(Availability))]),
      FieldDirector.text("price", "Prix", TypeOfFieldHTML.Num, false),
      FieldDirector.textArea("comment", "Commentaire", false)
    ], Actions.Respond)
  }

  close() {
    this.queryForm.reset()
    this.currentDrugRequest = null
  }

  save(reponse: any) {
    // L'emploi de l'assignation permet de cloner le requête coupant la référence entre le nouvel objet et l'ancien
    const requestWithResponse = Object.assign({}, this.currentDrugRequest)
    requestWithResponse!.response = reponse as Response
    for(let [key, value] of Object.entries(reponse.availability)) {
      if (value as boolean) {
        requestWithResponse!.response!.availability = key as Availability
      }
    }
    this.drugRequestService.respond(requestWithResponse!).subscribe({
      next: () => { this.close(); location.reload() }
    })
    this.close()
  }

  consultingRequest(drugRequest: any) {
    this.queryForm.launch([])
    this.currentDrugRequest = this.requests.filter(request => request.client.email === drugRequest.email)[0]
  }

  orderByKey(key: string): void {
    this.list = this.list.sort((a: any, b: any) => {
      switch(key) {
        case Headers.Drug: return this.compare(a.drug, b.drug)
        case Headers.Concentration: return this.compare(a.concentration, b.concentration)
        case Headers.Type: return this.compare(a.type, b.type)
        case Headers.Quantity: return this.compare(a.quantity, b.quantity)
        case Headers.LastName: return this.compare(a.lastName, b.lastName)
        case Headers.FirstName: return this.compare(a.firstName, b.firstName)
        case Headers.Email: return this.compare(a.email, b.email)
        case Headers.Telephon: return this.compare(a.telephon, b.telephon)
        case Headers.Insurance: return this.compare(a.insurance, b.insurance)
        default: return 0
      }
    })
  }

  handleFilter(filter: Filter): void {
    if (filter.isHeader()) { this.orderByKey(filter.value as string) }
  }
}

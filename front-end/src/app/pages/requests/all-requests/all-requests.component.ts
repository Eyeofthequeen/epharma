import { Component, OnInit } from '@angular/core';
import { Availabilities, Headers, TypeOfDrug } from 'src/assets/ts/shared/constants';
import { DrugRequest } from 'src/app/models/DrugRequest';
import { DrugRequetsService } from 'src/app/services/drug-requests/drug-requets.service';
import { Actions, TypeOfFieldHTML } from 'src/assets/ts/shared/constants';
import { FieldDirector } from 'src/assets/ts/obj/Field';
import { Filter, Filtrable } from 'src/assets/ts/abstracts/Filtrable';
import { Form } from 'src/assets/ts/obj/Form';
import { ActivatedRoute, Router } from '@angular/router';
import { DrugsService } from 'src/app/services/drugs/drugs.service';
import { Subscription } from 'rxjs';
import { loggedInUser } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent extends Filtrable implements OnInit {
  private subscriptions = new Subscription()
  headers = [ Headers.Date, Headers.Quantity, Headers.Drug, Headers.Type, Headers.Concentration, Headers.Pharmacy ]
  close = Actions.Close
  consult = Actions.Consult
  keysToIgnore = ["description", "price", "total", "id"]
  currentDrugRequest: DrugRequest | null = null
  queryForm: Form
  consultingForm: Form
  private hasToReload = false

  // Sert à l'affichage du tableau
  partialRequests: Array<Object> = []

  constructor(private router: Router, private drugRequestService: DrugRequetsService, private route: ActivatedRoute, private drugsService: DrugsService) { super() }

  ngOnInit(): void {
    this.initForms()
    this.subscriptions.add(this.drugRequestService.getAll().subscribe({
      next: (rep) => {
        this.list = rep as DrugRequest[]
        
        (rep as DrugRequest[]).forEach(element => {
          let dict: {[id: string]: any} = {}
          dict = Object.assign({}, element)
          dict["drug"]["id"] = element.id;
          dict["pharmacy"] = element.pharmacy?.name
          delete dict["response"]
          this.partialRequests.push(dict)
        })
      }
    }))

    this.subscriptions.add(this.route.params.subscribe(params => {
      if(params['id']) {
        this.drugsService.getById(+params['id']).subscribe({ // (+) converts string 'id' to a number
          next: (rep) => {
            this.queryForm.launch(Object.entries(rep))
            this.hasToReload = true
          }
        })
      }
   }))
  }

  private initForms() {
    this.consultingForm = new Form([
      FieldDirector.text("id", "", TypeOfFieldHTML.Hidden, false),
      FieldDirector.checkbox("hasGeneric", "", {gen: "Générique disponible"}, [], false),
      FieldDirector.checkbox("availability", "", Availabilities, [], false),
      FieldDirector.text("price", "Prix", TypeOfFieldHTML.Num, false),
      FieldDirector.textArea("comment", "Commentaire", false)
    ], Actions.Close)

    this.queryForm = new Form([
      FieldDirector.selection("name", "Nom", []),
      FieldDirector.text("concentration", "Concentration", TypeOfFieldHTML.Text),
      FieldDirector.selection("type", "Type", Object.values(TypeOfDrug)),
      FieldDirector.text("quantity", "Quantite", TypeOfFieldHTML.Num)
    ], Actions.Add)
    this.loadDrugsNames()
  }

  private loadDrugsNames() {
    this.subscriptions.add(this.drugsService.getAllNames().subscribe({
      next: (names) => { this.queryForm.setSelection("name", names) }
    }))
  }

  closing() {
    this.consultingForm.reset()
    this.queryForm.reset()
  }

  consultingRequest(drugRequest: any) {
    this.currentDrugRequest = (this.list as DrugRequest[]).filter(request => request.id === drugRequest.id)[0]
    if (this.currentDrugRequest.response) {
      const entries: {[id: string]: any} = Object.assign({}, this.currentDrugRequest.response)
      entries["hasGeneric"] = "gen"
      this.consultingForm.launch(Object.entries(entries))
    } else {
      this.consultingForm.launch([])
    }
  }

  launch() {
    this.queryForm.launch([])
  }

  cancel() {
    this.closing()
    this.reload()
  }

  km() {
    return loggedInUser?.maximumDistance
  }

  private reload() {
    if(this.hasToReload) {
      this.router.navigate(['requests/all'])
    }
  }

  save(query: any) {
    this.subscriptions.add(this.drugRequestService.create(query).subscribe({
      next: () => { "OK" }
    }))
    this.closing()
    this.reload()
  }

  orderByKey(key: string): void {}

  handleFilter(filter: Filter): void {}
}

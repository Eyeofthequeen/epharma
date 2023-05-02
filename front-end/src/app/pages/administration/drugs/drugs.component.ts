import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldDirector } from 'src/assets/ts/obj/Field';
import { Actions, Headers, TypeOfFieldHTML, TypeOfDrug } from 'src/assets/ts/shared/constants';
import { Checkbox, Filtrable, Filter, Dropdown } from 'src/assets/ts/abstracts/Filtrable';
import { IActions } from 'src/assets/ts/interfaces/IActions';
import { Form } from 'src/assets/ts/obj/Form';
import { DrugsService } from 'src/app/services/drugs/drugs.service';
import { Drug } from 'src/app/models/Drug';
import { Lot } from 'src/app/models/Lot';
import { ITable } from 'src/app/components/table/table.component';
import { Subscription } from 'rxjs';
import { LotsService } from 'src/app/services/lots/lots.service';
import { Search } from 'src/assets/ts/obj/Search';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss']
})
export class DrugsComponent extends Filtrable implements OnInit, OnDestroy, IActions, ITable {
  private subscriptions = new Subscription()
  private searching: Search
  headers: Headers[] = []
  keysToIgnore: string[]
  drugForm: Form
  lotForm: Form

  constructor(private drugsService: DrugsService, private lotsService: LotsService) { super() }
  
  ngOnInit(): void {
    this.initForms()
    this.handleFilter(new Dropdown())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  private initForms() {
    this.drugForm = new Form([
      FieldDirector.text("id", "", TypeOfFieldHTML.Hidden, false),
      FieldDirector.text("name", "Nom", TypeOfFieldHTML.Text),
      FieldDirector.selection("type", "Type", Object.values(TypeOfDrug)),
      FieldDirector.text("price", "Prix", TypeOfFieldHTML.Num),
      FieldDirector.text("concentration", "Concentration", TypeOfFieldHTML.Text),
      FieldDirector.textArea("description", "Description", false)
    ], Actions.Add)

    this.lotForm = new Form([
      FieldDirector.selection("name", "Nom", []),
      FieldDirector.selection("type", "Type", Object.values(TypeOfDrug)),
      FieldDirector.text("number", "Numéro du lot", TypeOfFieldHTML.Num, undefined, false),
      FieldDirector.text("expiration", "Date d'expiration", TypeOfFieldHTML.Date),
      FieldDirector.text("quantity", "Quantite", TypeOfFieldHTML.Num)
    ], Actions.Add)
    this.loadDrugsNames()
  }

  launching(formName: string) {
    const form = ((formName === 'med') ? this.drugForm : this.lotForm)
    form.launch([])
    form.setAction(Actions.Add)

    if (formName === 'lot') {
      this.lotsService.getNextLotNumber().subscribe({
        next: (number) => {
          debugger
          this.lotForm.setValue("number", number) // Récupérer prochain numéro de lot
        }
      })
    }
  }

  search(value: string) {
    this.searching.execute("name", value)
    this.list = this.searching.getList()
  }

  editing(drug: any) {
    const form = (("number" in drug) ? this.lotForm : this.drugForm)
    form.launch(Object.entries(drug))
    form.setAction(Actions.Edit)
  }

  close() {
    this.drugForm.reset()
    this.lotForm.reset()
  }

  save(drugOrLot: any) {
    this.close()

    if("number" in drugOrLot) {
      this.subscriptions.add(this.lotsService.save(drugOrLot).subscribe({
        next: () => { location.reload() }
      }))
    } else {
      this.subscriptions.add(this.drugsService.save(drugOrLot).subscribe({
        next: () => { location.reload() },
      }))
    }
  }

  private loadDrugsNames() {
    this.subscriptions.add(this.drugsService.getAllNames().subscribe({
      next: (names) => { 
          this.lotForm.setSelection("name", names)
        }
    }))
  }

  orderByKey(key: string) {
    this.list = this.list.sort((a: any, b: any) => {
      switch(key) {
        case Headers.LastName: return this.compare(a.name, b.name)
        case Headers.Lot: return this.compare(a.number, b.number)
        case Headers.Quantity: return this.compare(a.quantity, b.quantity)
        case Headers.Expiration: return this.compare(a.expiration, b.expiration)
        case Headers.Type: return this.compare(a.type, b.type)
        case Headers.Concentration: return this.compare(a.concentration, b.concentration)
        case Headers.Price: return this.compare(a.price, b.price)
        default: return 0
      }
    })
  }

  handleFilter(filter: Filter): void {
    if (filter.isHeader()) { this.orderByKey(filter.value as string) }
    else {
      if (filter instanceof Checkbox && filter.value) {
        this.keysToIgnore = ["description", "id", "total"]
        this.headers = [Headers.Expiration, Headers.Quantity, Headers.Drug, Headers.Concentration, Headers.Price, Headers.Type, Headers.Lot, Headers.Button]
        this.lotsService.getAll().subscribe({
          next: (rep) => {
            this.list = rep as Lot[]
            this.searching = new Search(this.list)
          }
        })
      } else {
        this.headers = [Headers.Drug, Headers.Concentration, Headers.Price, Headers.Type, Headers.Quantity, Headers.Button]
        this.keysToIgnore = ["description", "id"]
        this.drugsService.getAll().subscribe({
          next: (rep) => {
            this.list = rep as Drug[]
            this.searching = new Search(this.list)
          }
        })
      }
    }
  }
}

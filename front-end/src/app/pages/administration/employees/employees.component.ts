import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldDirector } from 'src/assets/ts/obj/Field';
import { Actions, Headers, TypeOfFieldHTML } from 'src/assets/ts/shared/constants';
import { Filter } from 'src/assets/ts/abstracts/Filtrable';
import { IActions } from 'src/assets/ts/interfaces/IActions';
import { Triable } from 'src/assets/ts/abstracts/Triable';
import { Form } from 'src/assets/ts/obj/Form';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { Employee } from 'src/app/models/Employee';
import { Subscription } from 'rxjs';
import { Search } from 'src/assets/ts/obj/Search';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends Triable implements IActions, OnInit, OnDestroy {
  private subscriptions = new Subscription()
  private searching: Search
  add = Actions.Add
  edit = Actions.Edit
  headers = [Headers.FirstName, Headers.LastName, Headers.Telephon, Headers.Email, Headers.DateOfBirth, Headers.HiredDate, Headers.Button]
  keysToIgnore = ["id"]
  userForm: Form
  
  constructor(private employeesService: EmployeesService) { super() }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  ngOnInit(): void {
    this.initForms()
    this.subscriptions.add(this.employeesService.getAll().subscribe({
      next: (employees) => {
        this.list = employees as Employee[]
        this.searching = new Search(this.list)
      }
    }))
  }

  private initForms() {
    this.userForm = new Form([
      FieldDirector.text("id", "", TypeOfFieldHTML.Hidden, false),
      FieldDirector.text("lastName", "Nom", TypeOfFieldHTML.Text),
      FieldDirector.text("firstName", "Prénom", TypeOfFieldHTML.Text),
      FieldDirector.text("email", "Courriel", TypeOfFieldHTML.Email),
      FieldDirector.text("telephon", "Téléphone", TypeOfFieldHTML.Tel),
      FieldDirector.text("dateOfBirth", "Date naissance", TypeOfFieldHTML.Date),
      FieldDirector.text("hiringDate", "Date d'embauche", TypeOfFieldHTML.Date)
    ], Actions.Add)
  }

  launching() {
    this.userForm.launch([])
    this.userForm.setAction(Actions.Add)
  }

  editing(user: any): void {
    this.userForm.launch(Object.entries(user))
    this.userForm.setAction(Actions.Edit)
  }

  close(): void {
    this.userForm.reset()
  }

  save(usager: any): void {
    let employee = usager as Employee
    this.subscriptions.add(this.employeesService.save(employee).subscribe({
      next: () => { 
        location.reload();
        this.close()
      }
    }))
  }

  search(value: string) {
    this.searching.execute("username", value)
    this.list = this.searching.getList()
  }

  orderByKey(key: string): void {
    this.list = this.list.sort((a: any, b: any) => {
      switch(key) {
        case Headers.User: return this.compare(a.usager, b.usager)
        case Headers.LastName: return this.compare(a.lastName, b.lastName)
        case Headers.FirstName: return this.compare(a.firstName, b.firstName)
        case Headers.Email: return this.compare(a.email, b.email)
        case Headers.DateOfBirth: return this.compare(a.dateOfBirth, b.dateOfBirth)
        case Headers.HiredDate: return this.compare(a.hiringDate, b.hiringDate)
        default: return 0
      }
    })
  }

  handleFilter(filter: Filter) {
    if (filter.isHeader()) { this.orderByKey(filter.value as string) }
  }
}

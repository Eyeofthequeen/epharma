import { Component, OnDestroy, OnInit } from '@angular/core';
import { Drug } from 'src/app/models/Drug';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DrugsService } from 'src/app/services/drugs/drugs.service';
import { Role } from 'src/assets/ts/shared/constants';
import { loggedInUser } from 'src/app/services/auth/auth.service';
import { Form } from 'src/assets/ts/obj/Form';
import { Observable, Subscription } from 'rxjs';
import { Search } from 'src/assets/ts/obj/Search';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [AuthService]
})

export class InventoryComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  private searching: Search
  title: string
  drugs: Drug[] = []

  requestForm: Form

  constructor(private drugsService: DrugsService, private router: Router) {}
  
  ngOnInit(): void {
    let service$: Observable<any>
    if(loggedInUser?.roles.includes(Role.Administration)) {
      service$ = this.drugsService.getAll()
      this.title = "Inventaire"
    } else {
      service$ = this.drugsService.getAll()
      this.title = "Dictionnaire"
    }

    this.subscriptions.add(service$.subscribe({
      next: (res) => {
        this.drugs = res as Drug[]
        this.searching = new Search(this.drugs)
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  request(drug: Drug) {
    this.router.navigate(['requests/all/edit/', drug.id])
  }

  search(value: string) {
    this.searching.execute("name", value)
    this.drugs = this.searching.getList()
  }
}

import { Component, OnInit } from '@angular/core';
import { LotsService } from 'src/app/services/lots/lots.service';
import { TypeOfExpiration, TypeOfDrug, Headers, Actions } from 'src/assets/ts/shared/constants';
import { Filtrable, Filter } from 'src/assets/ts/abstracts/Filtrable';
import { Lot } from 'src/app/models/Lot';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})

export class AlertsComponent extends Filtrable implements OnInit {
  action = Actions.Archive
  expirations = Object.values(TypeOfExpiration)
  types = Object.values(TypeOfDrug)
  keysToIgnore = ["id", "price", "description", "total"]
  
  headers = [Headers.Expiration, Headers.Quantity, Headers.Drug, Headers.Concentration, Headers.Type, Headers.Lot, Headers.Button]

  constructor(private lotsService: LotsService) { super() }

  ngOnInit(): void {
    this.lotsService.getAll().subscribe({
      next: (rep) =>  {
        this.list = rep as Lot[]
      }
    })
  }

  archive(lot: any) {
    this.lotsService.archive(lot).subscribe({
      next: () => {
        delete this.list[this.list.indexOf(lot)]
        this.list = this.list.filter((med, _) => med != null )
      }
    })
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
  }
}

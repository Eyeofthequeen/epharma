import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actions, Headers } from 'src/assets/ts/shared/constants';
import { Header, Filter } from 'src/assets/ts/abstracts/Filtrable';
import { dateToString } from 'src/assets/ts/shared/utils';

export interface ITable {
  // Déclarations obligatoires
  keysToIgnore: string[]
  headers: string[]
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() keysToIgnore: string[] = []
  @Input() headers: String[] = []
  @Input() objets: Object[] = []
  @Input() action: String = Actions.Edit

  @Output() notifierAction = new EventEmitter<Object>()
  @Output() notifierFiltreEntete = new EventEmitter<string>()

  @Output() onFilter = new EventEmitter<Filter>()

  flatenObjects: Object[] = this.convertComplexObjectsToFlatenDicts(this.objets)

  filter: Filter = new Header()

  all() {
    if(this.objets) {
      return this.convertComplexObjectsToFlatenDicts(this.objets)
    }
    return []
  }

  private convertComplexObjectsToFlatenDicts(list: Object[]) {
    const newList: Object[] = []
    list.forEach(obj => {
      newList.push(this.convertComplexObjectToFlatenDict(obj))
    })
    return newList
  }

  private convertComplexObjectToFlatenDict(obj: Object) {
    let dict: {[id: string]: any} = {}
    for(let [key, value] of Object.entries(obj)) {
      if (value instanceof Object && !(value instanceof Date)) {
        dict = {...dict, ...Object.assign({}, dict, value)}
      } else {
        dict[key] = value
      }
    }
    return dict
  }

  convertToList(dict: {}) {
    return Object.values(Object.fromEntries(this.filterDict(dict)))
  }

  private filterDict(dict: {}) {
    return Object.entries(dict).filter(([key ,value]) => value !== null && !this.keysToIgnore.includes(key))
  }

  notifier(obj: Object) {
    this.notifierAction.emit(obj)
  }

  handleValue(val: any) {
    if (val instanceof Date) { return dateToString(val) }
    return val
  }
  
  exportValue(index: number) {
    Object.entries(Headers).forEach( entete => {
      if (entete[1] === this.headers[index]) {
        this.filter.value = entete[1]
        this.onFilter.emit(this.filter)
      }
    })
  }
}

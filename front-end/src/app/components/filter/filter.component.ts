import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Checkbox, Dropdown, Filter } from 'src/assets/ts/abstracts/Filtrable';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() onFilter = new EventEmitter<Filter>()
  @Input() values: String[] = []
  filter: Filter

  constructor() {}

  ngOnInit(): void {
    this.filter = (this.values.length > 0) ? new Dropdown() : new Checkbox()
  }

  exportValue(value: string | boolean) {
    this.filter.value = value
    this.onFilter.emit(this.filter)
  }
}
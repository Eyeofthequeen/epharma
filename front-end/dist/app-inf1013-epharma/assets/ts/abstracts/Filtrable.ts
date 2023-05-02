import { Filters } from "src/assets/ts/shared/constants"
import { Triable } from "./Triable"

export abstract class Filter {
  private _type: Filters
  private _value: string | boolean = ''

  set type(type: Filters) {
    this._type = type
  }

  set value(val: string | boolean) {
      this._value = (this._value === val) ? '' : val
  }

  get value() {
    return this._value
  }

  valueHasBeenSelected() {
    return this._value as string !== '' && this._value as boolean
  }

  isSelected(val: String): boolean {
    return val === this._value
  }

  isCheckbox() {
    return this._type === Filters.Checkbox
  }

  isHeader() {
    return this._type === Filters.Header
  }
}

export class Header extends Filter {
  constructor() {
    super()

    this.type = Filters.Header
  }
}

export class Checkbox extends Filter {
  constructor() {
    super()

    this.type = Filters.Checkbox
    this.value = false
  }

}

export class Dropdown extends Filter {
  constructor() {
    super()

    this.type = Filters.List
  }
}

export abstract class Filtrable extends Triable {
  filters: Filter[] = []

  popFilter(index: number) {
    delete this.filters[index]
    this.filters = this.filters.filter((f, _) => f != null)
  }

  addFilter(filter: Filter) {
      if (filter.valueHasBeenSelected()) {
          if (this.filters.includes(filter)) {
              this.popFilter(this.filters.indexOf(filter))
          }
          this.filters.push(filter)
      } else {
          this.popFilter(this.filters.indexOf(filter))
      }

      this.handleFilter(filter)
      console.log(this.filters)
  }

  abstract handleFilter(filter: Filter): void
}
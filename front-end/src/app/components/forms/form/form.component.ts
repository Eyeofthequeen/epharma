import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Field } from 'src/assets/ts/obj/Field';
import { Actions, TypeOfField, TypeOfFieldHTML, TypeOfDrug } from 'src/assets/ts/shared/constants';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup
  types = Object.values(TypeOfDrug)
  visibilite: boolean = true

  @Output() OnSubmit = new EventEmitter<FormGroup>()
  @Output() OnCancel = new EventEmitter()
  @Output() OnPartialAddressDemand = new EventEmitter()

  @Input() action: Actions
  @Input() title: string
  @Input() fields: Field[] = []

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({})
    this.fields.forEach((field: Field) => {
      let validators = []
      
      if (field.required) { validators.push(Validators.required) }
      if (field.typeHTML == TypeOfFieldHTML.Email) { validators.push(Validators.email) }

      if (field.type == TypeOfField.Checkbox) {
        let group = this.formBuilder.group({})
        for (let option in field.options) {
          group.addControl(option, new FormControl(false))
          group.get(option)?.setValue(option === field.value)
        }
        group.addValidators(field.additionalValidations)
        this.form.addControl(field.key, group)
      } else {
        this.form.addControl(field.key, new FormControl(field.value, validators))
      }

      if (!field.isActif) { this.form.get(field.key)?.disable() }
    })
  }

  isChecked(field: Field, key: any) {
    return field.value === key
  }

  generatePartialAddress(){
    this.OnPartialAddressDemand.emit()
  } 

  cancel(event: any) {
    event.preventDefault()
    this.form.reset()
    this.visibilite = false
    this.OnCancel.emit()
  }

  submit(event: any) {
    event.preventDefault()
    this.OnSubmit.emit(this.form.getRawValue())
    this.form.reset()
  }
}

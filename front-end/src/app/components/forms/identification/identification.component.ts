import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { TypeOfRegistering } from 'src/assets/ts/shared/constants';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
  providers: [ValidationService]
})
export class IdentificationComponent implements OnInit {
  @Input() hasAccount: boolean = true
  @Input() successes: string[] = []
  @Input() errors: string[] = []
  @Output() onLogin = new EventEmitter<FormGroup>()
  @Output() onRegister = new EventEmitter<FormGroup>()
  form: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router, private validation: ValidationService) {}
  
  ngOnInit(): void {
    if (this.hasAccount) {
        this.form = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
          }
        )
    } else {
      this.form = this.formBuilder.group({
        type: new FormGroup({
          pharmacien: new FormControl(false),
          client: new FormControl(false)
        }, this.validation.onlyOneSelectedValidator(["pharmacien", "client"])),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      })
    }
  }

  updateCheckboxes(client: HTMLInputElement, pharmacien: HTMLInputElement) {
    this.form.patchValue({type: {pharmacien: pharmacien.checked, client: client.checked}})
  }

  login() {
    this.onLogin.emit(this.form.getRawValue())
  }

  register() {
    let values = this.form.getRawValue()
    values.type = (values.type.pharmacien) ? TypeOfRegistering.Pharmacist : TypeOfRegistering.Client
    this.onRegister.emit(values)
    this.form.reset()
  }

  goToPath(chemin: string) {
    this.router.navigate([chemin])
  }
}
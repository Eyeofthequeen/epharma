import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalisationService } from 'src/app/services/localisation/localisation.service';
import { loggedInUser } from 'src/app/services/auth/auth.service';
import { Address } from 'src/app/models/Address';
import { Subscription } from 'rxjs';
import { FieldDirector } from 'src/assets/ts/obj/Field';
import { Actions, Professionnal, ProfessionnalLabel, TypeOfFieldHTML } from 'src/assets/ts/shared/constants';
import { Form } from 'src/assets/ts/obj/Form';
import { Pharmacy } from 'src/app/models/Pharmacy';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [LocalisationService, AuthService]
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User = loggedInUser as User
  isProfessionnal: boolean = this.auth.isProfessionnal()
  errors: string[] = []
  subscriptions: Subscription = new Subscription()

  addressForm: Form
  professionalForm: Form
  preferencesForm: Form
  informationsForm: Form
  pharmacyForm: Form

  constructor(private service: LocalisationService, private auth: AuthService) {}

  ngOnInit(): void {
    const local = this.service.getLocalisation().subscribe(rep => {
      this.user.position = { longitude: rep.coords.longitude, latitude: rep.coords.latitude }
    })
    setTimeout(() => {local.unsubscribe()}, 5000)

    this.initForms()
  }

  private initForms() {
    this.addressForm = new Form([
      FieldDirector.localisation("line", "Adresse"),
      FieldDirector.text("apartment", "Appartement, suite, étage, bureau", TypeOfFieldHTML.Text, false),
      FieldDirector.text("city", "Ville", TypeOfFieldHTML.Text),
      FieldDirector.text("province", "État/Province", TypeOfFieldHTML.Text),
      FieldDirector.text("postalCode", "Code postal", TypeOfFieldHTML.Text),
      FieldDirector.text("country", "Pays", TypeOfFieldHTML.Text)
    ], Actions.Edit)

    this.informationsForm = new Form([
      FieldDirector.text("lastName", "Nom", TypeOfFieldHTML.Text),
      FieldDirector.text("firstName", "Prénom", TypeOfFieldHTML.Text),
      FieldDirector.text("telephon", "Téléphone", TypeOfFieldHTML.Tel),
      FieldDirector.text("email", "Courriel", TypeOfFieldHTML.Email)
    ], Actions.Edit)
    
    this.preferencesForm = new Form([
      FieldDirector.slider("maximumDistance", "Distance maximal en km ")
    ], Actions.Edit)

    this.professionalForm = new Form([
      FieldDirector.selection("professional", "Titre du professionnel", Object.values(ProfessionnalLabel))
    ], Actions.Edit)
    this.professionalForm.addFields(this.informationsForm.fields)

    this.pharmacyForm = new Form([
      FieldDirector.text("name", "Nom", TypeOfFieldHTML.Text),
      FieldDirector.text("telephon", "Téléphone", TypeOfFieldHTML.Tel),
      FieldDirector.text("email", "Courriel", TypeOfFieldHTML.Email)
    ], Actions.Edit)
    this.pharmacyForm.addFields(this.addressForm.fields)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getPartialAddress() {
    this.subscriptions.add(this.service.getPartialAddress().subscribe(rep => {
      this.addressForm.launch(Object.entries({
        city: rep.body.city,
        province: rep.body.state_prov,
        country: rep.body.country_name
      }))
    }))
  }

  launching(form: string) {
    switch(form) {
      case 'address': this.addressForm.launch(Object.entries(this.user.address)); break
      case 'informations': this.informationsForm.launch(Object.entries(this.user)); break
      case 'preferences': this.preferencesForm.launch(Object.entries(this.user)); break
      case 'professional': {
        this.professionalForm.launch(Object.entries(this.user))
        this.professionalForm.setValue('professional', this.professionalLabel())
        break
      }
      case 'pharmacy': {
        const entries = (this.user.pharmacy) ? Object.entries(this.user.pharmacy) : []
        this.pharmacyForm.launch(entries.concat(
          (this.user.pharmacy?.address) ? Object.entries(this.user.pharmacy?.address) : [])
        )
        break
      }
    }
  }

  professionalLabel() {
    console.log(this.user.professional == Professionnal.Pharmacist);
    switch(this.user.professional) {
      case Professionnal.Pharmacist: return ProfessionnalLabel.Pharmacist
      case Professionnal.LabTech: return ProfessionnalLabel.LabTech
      case Professionnal.Nurse: return ProfessionnalLabel.Nurse
      default: return "Aucun titre disponible"
    }
  }

  professionalId(label: string) {
    switch(label) {
      case ProfessionnalLabel.Pharmacist: return Professionnal.Pharmacist
      case ProfessionnalLabel.LabTech: return Professionnal.LabTech
      case ProfessionnalLabel.Nurse: return Professionnal.Nurse
      default: return Professionnal.None
    }
  }

  editProfessionalInfos(infos: any) {
    this.user.professional = this.professionalId(infos.professional)
    this.user.firstName = infos.firstName
    this.user.lastName = infos.lastName
    this.user.telephon = infos.telephon
    this.editing()
  }

  editPreferences(preferences: any) {
    this.user.maximumDistance = preferences.maximumDistance
    this.editing()
  }

  editAddress(address: any) {
    this.user.address = address as Address
    this.editing()
  }

  editInformations(infos: any) {
    let partial = {
      firstName: infos.firstName,
      lastName: infos.lastName,
      telephon: infos.telephon
    }

    this.user.firstName = partial.firstName
    this.user.lastName = partial.lastName
    this.user.telephon = partial.telephon
    this.editing()
  }

  editPharmacy(pharmacy: any) {
    if (!this.user.pharmacy) {
      this.user.pharmacy = new Pharmacy()
    }

    this.user.pharmacy!.telephon = pharmacy.telephon
    this.user.pharmacy!.email = pharmacy.email
    this.user.pharmacy!.name = pharmacy.name
    this.user.pharmacy!.address = pharmacy as Address
    this.editing()
  }

  private reset() {
    this.informationsForm.reset()
    this.addressForm.reset()
    this.preferencesForm.reset()
    this.professionalForm.reset()
    this.pharmacyForm.reset()
  }

  private editing() {
    this.subscriptions.add(
      this.auth.editing(this.user).subscribe({
        next: () => { this.reset() },
        error: (error) => {
          this.errors.push(error.error)
        }
      })
    )
  }
}

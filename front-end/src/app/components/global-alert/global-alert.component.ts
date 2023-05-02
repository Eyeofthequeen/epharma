import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Alert } from 'src/assets/ts/obj/Alert';

@Component({
  selector: 'app-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.scss']
})
export class AlerteBlobalComponent implements OnInit {
  @Input() alert: Alert

  @Output() notifierSuppression = new EventEmitter<Alert>()
  
  estActive: boolean = false;

  ngOnInit(): void {
    new Promise(_ => setTimeout(() => {this.estActive = true}, 200));
  }

  supprimer(): void {
    this.estActive = false
    new Promise(_ => setTimeout(() => {
      this.notifierSuppression.emit(this.alert)
    }, 1000));
  }
}

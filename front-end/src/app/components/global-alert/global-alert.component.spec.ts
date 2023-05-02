import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteBlobalComponent } from './global-alert.component';

describe('AlerteBlobalComponent', () => {
  let component: AlerteBlobalComponent;
  let fixture: ComponentFixture<AlerteBlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlerteBlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlerteBlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

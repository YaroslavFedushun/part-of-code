import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressRegStepComponent } from './address-reg-step.component';

describe('AddressRegStepComponent', () => {
  let component: AddressRegStepComponent;
  let fixture: ComponentFixture<AddressRegStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressRegStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressRegStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAccountRegStepComponent } from './contact-account-reg-step.component';

describe('ContactAccountRegStepComponent', () => {
  let component: ContactAccountRegStepComponent;
  let fixture: ComponentFixture<ContactAccountRegStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAccountRegStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAccountRegStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

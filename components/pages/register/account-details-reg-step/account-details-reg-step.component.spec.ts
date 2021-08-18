import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsRegStepComponent } from './account-details-reg-step.component';

describe('AccountDetailsRegStepComponent', () => {
  let component: AccountDetailsRegStepComponent;
  let fixture: ComponentFixture<AccountDetailsRegStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsRegStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsRegStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

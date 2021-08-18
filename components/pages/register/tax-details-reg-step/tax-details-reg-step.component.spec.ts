import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDetailsRegStepComponent } from './tax-details-reg-step.component';

describe('TaxDetailsRegStepComponent', () => {
  let component: TaxDetailsRegStepComponent;
  let fixture: ComponentFixture<TaxDetailsRegStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxDetailsRegStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxDetailsRegStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

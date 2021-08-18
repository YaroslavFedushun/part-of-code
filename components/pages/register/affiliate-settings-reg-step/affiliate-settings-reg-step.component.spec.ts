import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateSettingsRegStepComponent } from './affiliate-settings-reg-step.component';

describe('AffiliateSettingsRegStepComponent', () => {
  let component: AffiliateSettingsRegStepComponent;
  let fixture: ComponentFixture<AffiliateSettingsRegStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateSettingsRegStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateSettingsRegStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

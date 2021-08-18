import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChecklistModule } from 'angular-checklist';
import { By } from "@angular/platform-browser"
import { NgxMaskModule } from 'ngx-mask'

import { QuoteFormComponent } from './quote-form.component';
import { RegexService } from "../../../../services/regex.service";
import { VehicleDataRequestsService } from "../../../../services/vehicle-data-requests.service";
import { YesNowButtonComponent } from './../../../shared/yes-no-button/yes-no-button.component';

describe('QuoteFormComponent', () => {
  let component: QuoteFormComponent;
  let fixture: ComponentFixture<QuoteFormComponent>;
  let submitButton: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuoteFormComponent,
        YesNowButtonComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        ChecklistModule,
        NgxMaskModule.forRoot()
      ],
      providers: [
        RegexService,
        VehicleDataRequestsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.myForm.controls['firstName'].setValue('Yudgine');
    component.myForm.controls['lastName'].setValue('Volodin');
    component.myForm.controls['email'].setValue('yuaa@gmail.com');
    component.myForm.controls['phone'].setValue('2525252525');
    component.myForm.controls['zipCode'].setValue('10001');
    component.myForm.controls['vin'].setValue('1FUPUDZBX1LG06559');
    component.hasVin = true;
    component.myForm.controls['vehicleMake'].setValue('BMW');
    component.myForm.controls['vehicleModel'].setValue('520');
    component.myForm.controls['vehicleYear'].setValue('2019');
    component.myForm.controls['vehicleMileage'].setValue('2500');
    component.myForm.controls['milesperyear'].setValue('2500');
    submitButton = fixture.debugElement.query(By.css('#submitButton')).nativeElement;
    fixture.detectChanges();
  });

  it('New Quote Form Component should create', () => {
    expect(component).toBeTruthy();
  });

  it('Regex patern firstName works', () => {
    component.myForm.controls['firstName'].setValue('Yudgine1');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Regex patern lastName works', () => {
    component.myForm.controls['lastName'].setValue('Volodin1');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Regex patern email works', () => {
    component.myForm.controls['email'].setValue('Volodin1');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Regex patern phone works', () => { 
    component.myForm.controls['phone'].setValue('25252525');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Regex patern zipCode works', () => {
    component.myForm.controls['zipCode'].setValue('1');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Regex patern vin works', () => {
    component.myForm.controls['vin'].setValue('jkjk1');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });


  it('Button submit enable if form feeled', () => {
    expect(submitButton.disabled).toBeFalsy();
  });

  it('Button submit disable if !firstName', () => {
    component.myForm.controls['firstName'].setValue(null);
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Button submit disable if !lastName', () => {
    component.myForm.controls['lastName'].setValue(null);
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Button submit disable if !email', () => {
    component.myForm.controls['email'].setValue(null);
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Button submit disable if !phone', () => {
    component.myForm.controls['phone'].setValue(null);
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Button submit disable if !zipCode', () => {
    component.myForm.controls['zipCode'].setValue(null);
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Button submit enable if !vin and vehicle data feelad', () => {
    component.hasVin = false;
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy();
  });

  it('Button submit enable if vin and no vehicle data feelad', () => {
    component.hasVin = false;
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy();
  });

  it('Button submit disable if !vehicleMileage', () => {
    component.myForm.controls['vehicleMileage'].setValue(null);
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Button submit disable if !milesperyear', () => {
    component.myForm.controls['milesperyear'].setValue(null);
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
  });

  
  it('Years for select generated', () => {
    expect(component.years.length === 22).toBeTruthy();
  });


  it('Toggle if user has VIN or not, works', () => {
    expect(component.hasVin).toBeTruthy();
    let clickSpan = fixture.debugElement.query(By.css('#toggleVin')).nativeElement;
    clickSpan.click();
    expect(component.hasVin).toBeFalsy();
  });

  it('Set Miles Per Year, works', () => {
    let arrayButtons = [
      '#value2500',
      '#value7500',
      '#value12500',
      '#value17500',
      '#value22500',
      '#value25000'
    ];
    for (let i = 0; i < 6; i++) {
      let vId = arrayButtons[i];
      let button = fixture.debugElement.query(By.css(vId)).nativeElement;
      button.click();
      fixture.detectChanges();
      expect(button.getAttribute('class')).toContain("active");
    };
  });

});

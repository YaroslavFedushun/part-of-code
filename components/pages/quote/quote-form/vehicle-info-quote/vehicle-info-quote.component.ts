import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { RegexService } from "../../../../../services/regex.service";
import { VehicleDataRequestsService } from "../../../../../services/vehicle-data-requests.service";
import * as moment from 'moment';
import { ErrorStateMatcher } from '@angular/material/core';
import { RequestService } from "../../../../../services/request.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-vehicle-info-quote',
  templateUrl: './vehicle-info-quote.component.html',
  styleUrls: ['./vehicle-info-quote.component.scss']
})


export class VehicleInfoQuoteComponent implements OnInit {
  public style: Object;
  @Output() goNext = new EventEmitter();
  @Input() lead_info;
  @Input()
  set setColor(value) {
    if (!value) return;
    this.style = value;
  }
  get headerStyleApply() {
    return this.style;
  }
  myForm: FormGroup;

  public submitClicked: boolean = false;

  public years: number[];
  public vinRegex: any;

  public milesperyear: number;
  public vehicleYear: number;
  public toggleTowing: boolean;
  public toggleCommerc: boolean;
  public toggleOdometer: boolean;
  public commercUseItems: string[];
  public isVinInclude: boolean;
  public hasVin: boolean;
  public models: string[];
  public makes: string[];

  private vinValidity = [
    Validators.required,
    Validators.pattern(this.vinRegex)
  ];

  constructor(
    private fb: FormBuilder,
    public regex: RegexService,
    private vdr: VehicleDataRequestsService,
    private RequestService: RequestService
  ) {
    this.initRegex(regex);
  }

  private initRegex(rgx): void {
    this.vinRegex = rgx.vinRegex();
  }

  ngOnInit() {
    this.setVariables();
    this.initForm();
  }

  private setVariables() {
    this.years = this.initYearsArray();
    this.isVinInclude = true;
    this.hasVin = true;
    this.models = [];
  }

  private initForm(): void {
    this.myForm = this.fb.group({
      vin: ['', this.vinValidity],
      vehicleMake: [''],
      vehicleModel: [''],
      vehicleYear: [null],
      vehicleMileage: ['', [
        Validators.required
      ]],
      heavytowing: [null, [
        Validators.required
      ]],
      commercialuse: [null, [
        Validators.required
      ]],
      commercialuseitems: [],
      odometeraltered: [null, [
        Validators.required
      ]],
      milesperyear: [null, [
        Validators.required
      ]]
    });
  }

  // init array [2019, 2020, ...] for select
  private initYearsArray(): number[] {
    let years = [];
    let momentInstance = moment().add(1, 'y');
    while (years.length < 22) {
      years.push(momentInstance.year());
      momentInstance = momentInstance.subtract(1, 'y');
    }
    return years;
  }

  public setMilesPerYear(data: number): void {
    this.myForm.controls['milesperyear'].setValue(data);
    this.milesperyear = data;
  }

  public getModels(): void {
    if (this.models.length === 0) this.models = this.vdr.getModels(null);
  }

  public getMakes(): void {
    this.makes = this.vdr.getModels(this.myForm.value.zipCode);
  }

  // toggle if user has VIN or not
  public toggleVin(): void {
    this.hasVin = !this.hasVin;
    this.vhicleDataRequired();
  }

  private vhicleDataRequired() {
    if (!this.hasVin) {
      this.getMakes();
      this.setVehicleDataValidity([Validators.required]);
      this.setVinValidity(null);
    } else {
      this.setVehicleDataValidity(null);
      this.setVinValidity(this.vinValidity);
    }
  }

  private setVinValidity(validity) {
    let vin = this.myForm.get('vin');
    vin.setValidators(validity);
    vin.updateValueAndValidity();
  }

  private setVehicleDataValidity(validity): void {
    const vehicleYear = this.myForm.get('vehicleYear');
    const vehicleMake = this.myForm.get('vehicleMake');
    const vehicleModel = this.myForm.get('vehicleModel');

    vehicleYear.setValidators(validity);
    vehicleMake.setValidators(validity);
    vehicleModel.setValidators(validity);

    vehicleYear.updateValueAndValidity();
    vehicleMake.updateValueAndValidity();
    vehicleModel.updateValueAndValidity();
  }

  public setData(place, data) {
    this.myForm.controls[place].setValue(data);
  }

  // set data before submit
  private setFormData(): void {
    this.myForm.controls['commercialuseitems'].setValue(this.commercUseItems);
  }

  public submit() {
    this.submitClicked = true;
    if (this.myForm.status === "VALID") {
      this.setFormData();
      this.completeLeadCreate();
    }
  }

  private completeLeadCreate() {
    let body = Object.assign(this.myForm.value, this.lead_info);
    this.RequestService.updateLead(body).then(() => this.goNext.emit())
  }

}

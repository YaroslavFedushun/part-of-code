import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocalStorageService } from 'ngx-webstorage';
import { ConfigService } from '../../../../services/config.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface MyModel {
  address: string,
  city: string,
  state: string,
  zipCode: string
}

@Component({
  selector: 'app-address-reg-step',
  templateUrl: './address-reg-step.component.html',
  styleUrls: ['./address-reg-step.component.scss']
})

export class AddressRegStepComponent implements OnInit {

  @Output() goNext = new EventEmitter();
  @Output() goBack = new EventEmitter();
  @Output() formData = new EventEmitter<MyModel>();

  public matcher = new MyErrorStateMatcher();
  myForm: FormGroup;

  public autocomplete_active: boolean;
  public address: Object;
  public formattedAddress: string;


  constructor(
    private fb: FormBuilder,
    private storage: LocalStorageService,
    public zone: NgZone,
    private config: ConfigService) {
    this.setConfig();
  }


  ngOnInit() {
    this.initForm();
  }

  private setConfig(): void {
    this.autocomplete_active = this.config.autocompleteAddressByGoogle_active();
  }

  private initForm(): void {
    let storage = this.storage.retrieve('addressRegStep');
    this.myForm = this.fb.group({
      address: [storage && storage.address || '', [
        Validators.required
      ]],
      city: [storage && storage.city || '', [
        Validators.required
      ]],
      state: [storage && storage.state || '', [
        Validators.required
      ]],
      zipCode: [storage && storage.zipCode || '', [
        Validators.required
      ]]
    });
  }

  public goNextStep(): void {
    if (this.myForm.status === "VALID") {
      this.storage.store('addressRegStep', this.myForm.value);
      this.goNext.emit('addressRegStep');
      this.formData.emit(this.myForm.value);
    }
    return;
  }

  public goBackStep(): void {
    this.goBack.emit('addressRegStep');
  }

  public getAddress(place: object) {
    this.address = place['formatted_address'];
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);

    if (this.address) {
      if (this.getStreetNumber(place) && this.getStreet(place))
        this.myForm.controls['address'].setValue(this.getStreetNumber(place) + ', ' + this.getStreet(place));
      if (this.getCity(place))
        this.myForm.controls['city'].setValue(this.getCity(place));
      if (this.getState(place))
        this.myForm.controls['state'].setValue(this.getState(place));
      if (this.getPostCode(place))
        this.myForm.controls['zipCode'].setValue(this.getPostCode(place));
    } else {
      this.autocomplete_active = false;
    }
  }

  private getAddrComponent(place, componentTemplate) {
    let result;
    if (place && place.address_components)
      for (let i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];
        if (componentTemplate[addressType]) {
          result = place.address_components[i][componentTemplate[addressType]];
          return result;
        }
      }
    return;
  }

  private getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  private getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  private getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  private getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  private getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

}

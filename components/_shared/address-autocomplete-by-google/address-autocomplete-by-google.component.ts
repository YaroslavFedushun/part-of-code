/// <reference types="@types/googlemaps" />

import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-address-autocomplete-by-google',
  templateUrl: './address-autocomplete-by-google.component.html',
  styleUrls: ['./address-autocomplete-by-google.component.scss']
})
export class AddressAutocompleteByGoogleComponent implements OnInit, AfterViewInit {
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  // @ViewChild('addresstext') addresstext: any;
  @ViewChild('addresstext', { static: false }) addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'US' },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

}

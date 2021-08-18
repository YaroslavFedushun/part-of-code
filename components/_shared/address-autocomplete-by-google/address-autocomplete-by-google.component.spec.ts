import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAutocompleteByGoogleComponent } from './address-autocomplete-by-google.component';

describe('AddressAutocompleteByGoogleComponent', () => {
  let component: AddressAutocompleteByGoogleComponent;
  let fixture: ComponentFixture<AddressAutocompleteByGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressAutocompleteByGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressAutocompleteByGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

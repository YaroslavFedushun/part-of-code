import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInfoQuoteComponent } from './vehicle-info-quote.component';

describe('VehicleInfoQuoteComponent', () => {
  let component: VehicleInfoQuoteComponent;
  let fixture: ComponentFixture<VehicleInfoQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleInfoQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInfoQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

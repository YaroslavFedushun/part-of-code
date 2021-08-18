import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadInfoQuoteComponent } from './lead-info-quote.component';

describe('LeadInfoQuoteComponent', () => {
  let component: LeadInfoQuoteComponent;
  let fixture: ComponentFixture<LeadInfoQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadInfoQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadInfoQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

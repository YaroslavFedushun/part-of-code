import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteFormCreateComponent } from './create-quote.component';

describe('QuoteFormCreateComponent', () => {
  let component: QuoteFormCreateComponent;
  let fixture: ComponentFixture<QuoteFormCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteFormCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

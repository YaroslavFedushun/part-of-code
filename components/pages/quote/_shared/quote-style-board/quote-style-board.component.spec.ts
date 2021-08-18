import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteStyleBoardComponent } from './quote-style-board.component';

describe('QuoteStyleBoardComponent', () => {
  let component: QuoteStyleBoardComponent;
  let fixture: ComponentFixture<QuoteStyleBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteStyleBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteStyleBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

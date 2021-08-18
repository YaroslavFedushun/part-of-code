import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from "@angular/platform-browser"

import { YesNowButtonComponent } from './yes-no-button.component';

describe('YesNowButtonComponent', () => {
  let component: YesNowButtonComponent;
  let fixture: ComponentFixture<YesNowButtonComponent>;
  let myInput;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YesNowButtonComponent],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNowButtonComponent);
    component = fixture.componentInstance;
    myInput = fixture.debugElement.query(By.css('#yesNoButton')).nativeElement;
    fixture.detectChanges();
  });

  it('YesNowButtonComponent should create', () => {
    expect(component).toBeTruthy(); 
  });

  it('Should import data and put to checkbox', async(() => {
    expect(myInput.checked).toBeFalsy();

    component.toggle = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(myInput.checked).toBeTruthy();
    });
  }));

  it('After click to checkbox should output data', () => {
    spyOn(component.toggleChange, 'emit');
    myInput.click();
    fixture.detectChanges();
    expect(myInput.checked).toBeTruthy();
    expect(component.toggleChange.emit).toHaveBeenCalled();
  });

});

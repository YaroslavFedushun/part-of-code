import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-quote-form-create',
  templateUrl: './quote-form-create.component.html',
  styleUrls: ['./quote-form-create.component.scss']
})
export class QuoteFormCreateComponent implements OnInit {
  public userData: Object;
  public newHeaderStyle: Object;
  public newBodyStyle: Object;

  constructor(private storage: LocalStorageService) {
    this.userData = this.storage.retrieve('currentUser');
  }

  public newHeaderApply(style) {
    this.newHeaderStyle = style;
  }

  public newBodyApply(style) {
    this.newBodyStyle = style;
  }

  ngOnInit() {
    this.subscribeForUserData();
  }

  private subscribeForUserData() {
    this.storage.observe('currentUser')
      .subscribe((newValue) => {
        this.userData = newValue;
      })
  }
}

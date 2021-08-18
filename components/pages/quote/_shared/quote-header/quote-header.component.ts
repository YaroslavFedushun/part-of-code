import { Component, OnInit, Input } from '@angular/core';
import { QuoteService } from '../../../../../services/quote.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    selector: 'app-quote-header',
    templateUrl: './quote-header.component.html',
    styleUrls: ['./quote-header.component.scss']
})
export class QuoteHeaderComponent implements OnInit {
  public imgUrl: String;
  public headerStyle: Object;

  @Input() user;
  @Input()
  set headerStyleApply(value) {
    if (!value) return;
    this.headerStyle = value;
  }
  get headerStyleApply() {
    return this.headerStyle;
  }

  constructor (
    public style: QuoteService,
    private storage: LocalStorageService
  ) { }


  ngOnInit() {
    this.setImage();
    this.setRootColors();
  }

  private setImage() {
    if (this.user.affiliateSettings.businessLogo.indexOf('ucarecdn') !== -1)
      this.imgUrl = this.user.affiliateSettings.businessLogo + '/-/resize/230x/'
    else this.imgUrl = this.user.affiliateSettings.businessLogo;
  }

  private setRootColors() {
    this.headerStyle = Object.assign(
      {}, this.storage.retrieve('currentuser').affiliateSettings.headerCSS
    );
  }

}

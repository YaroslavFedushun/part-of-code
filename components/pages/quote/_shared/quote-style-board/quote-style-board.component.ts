import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuoteService } from 'src/app/services/quote.service';
import { RequestService } from "src/app/services/request.service";
import { GetUserDataService } from "src/app/services/get-user-data.service";
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-quote-style-board',
  templateUrl: './quote-style-board.component.html',
  styleUrls: ['./quote-style-board.component.scss']
})
export class QuoteStyleBoardComponent implements OnInit {
  @Output() newHeaderApply = new EventEmitter();
  @Output() newBodyApply = new EventEmitter();

  public headerStyles: Object;
  public bodyStyles: Object;

  constructor(
    public style: QuoteService,
    private RequestService: RequestService,
    private user: GetUserDataService,
    private storage: LocalStorageService
  ) { }

  ngOnInit() {
    this.setColors()
  }

  public setRootColors() {
    this.headerStyles = Object.assign({}, this.style.rootHeaderStyle);
    this.bodyStyles = Object.assign({}, this.style.rootBodyStyle);
  }

  private setColors() {
    this.headerStyles = Object.assign({}, this.storage.retrieve('currentuser').affiliateSettings.headerCSS);
    this.bodyStyles = Object.assign({}, this.storage.retrieve('currentuser').affiliateSettings.bodyCSS);
  }



  public colorChanged() {
    this.newHeaderApply.emit(this.headerStyles);
    this.newBodyApply.emit(this.bodyStyles);
  }

  public save() {
    let body = {
      affiliateSettings: {
        headerCSS: JSON.stringify(this.headerStyles),
        bodyCSS: JSON.stringify(this.bodyStyles)
      }
    }
    this.RequestService.editAffiliate(body).then(() => this.refreshUserData());
  }

  private refreshUserData() {
    let userId = this.storage.retrieve('currentuser').id;
    this.user.getUser(userId);
  }

}

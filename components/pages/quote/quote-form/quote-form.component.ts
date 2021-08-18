import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { QuoteService } from '../../../../services/quote.service';


@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss']
})

export class QuoteFormComponent implements OnInit {
  public bodyStyle: Object;

  @Input() h1_lead_info;
  @Input() h1_Vehicle_info;
  @Input() affiliate_page;
  @Input()
  set bodyStyleApply(value) {
    if (!value) return;
    this.bodyStyle = value;
  }
  get headerStyleApply() {
    return this.bodyStyle;
  }

  public display_lead_info: boolean = true;
  public display_vihicle_info: boolean = false;
  public lead_info: Object;
  public vihicle_info: Object;

  constructor(
    public style: QuoteService,
    private storage: LocalStorageService
  ) { }

  ngOnInit() {
    this.setRootColors();
  }

  private setRootColors() {
    if (this.affiliate_page)
      this.bodyStyle = Object.assign({}, this.storage.retrieve('currentuser').affiliateSettings.bodyCSS)
    else this.bodyStyle = Object.assign({}, this.style.rootBodyStyle);
  }

  public goNextStep(data) {
    if (this.display_lead_info) {
      this.lead_info = data;
      this.display_lead_info = false;
      this.display_vihicle_info = true;
    } else {
      alert('lead created!')
    }
  }

  //  submit
  public submit(data): void {
    this.vihicle_info = data;
    alert('leadCreated')
  }

}

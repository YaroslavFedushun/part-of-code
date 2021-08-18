import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { RegexService } from "../../../../../services/regex.service";
import { RequestService } from "../../../../../services/request.service";
import { ErrorStateMatcher } from '@angular/material/core';
import { LocalStorageService } from 'ngx-webstorage';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-lead-info-quote',
  templateUrl: './lead-info-quote.component.html',
  styleUrls: ['./lead-info-quote.component.scss']
})
export class LeadInfoQuoteComponent implements OnInit {
  public style: String;
  myForm: FormGroup;
  @Output() goNext = new EventEmitter();
  @Input()
  set setColor(value) {
    if (!value) return;
    this.style = value;
  }
  get headerStyleApply() {
    return this.style;
  }

  public namesRegex: any;
  public phoneRegex: any;
  public leadId: string;


  constructor(
    private fb: FormBuilder,
    public regex: RegexService,
    private RequestService: RequestService,
    private storage: LocalStorageService
  ) {
    this.initRegex(regex);
  }

  private initRegex(rgx): void {
    this.namesRegex = rgx.namesRegex();
    this.phoneRegex = rgx.phoneRegex();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.myForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern(this.namesRegex)
      ]
      ],
      lastName: ['', [
        Validators.required,
        Validators.pattern(this.namesRegex)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: [null, [
        Validators.required,
        Validators.pattern(this.phoneRegex)
      ]],
      zipCode: [null, [
        Validators.required
      ]]
    });
  }

  public createLead() {
    if (this.myForm.status === "VALID") {
      let body = this.myForm.value;
      if (this.storage.retrieve('currentUser'))
        body.affiliateId = this.storage.retrieve('currentUser').id;
      this.RequestService.createLead(body).then((data) => this.goNextStep({ id: data.leadId }))
    }
  }

  private goNextStep(leadId) {
    let body = Object.assign(this.myForm.value, leadId);
    this.goNext.emit(body);
  }

}                            

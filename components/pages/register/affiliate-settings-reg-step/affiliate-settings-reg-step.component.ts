import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RegexService } from "../../../../services/regex.service";
import { LocalStorageService } from 'ngx-webstorage';
import { NotifierService } from 'angular-notifier';
import { ConfigService } from '../../../../services/config.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-affiliate-settings-reg-step',
  templateUrl: './affiliate-settings-reg-step.component.html',
  styleUrls: ['./affiliate-settings-reg-step.component.scss']
})

export class AffiliateSettingsRegStepComponent implements OnInit {

  @Output() create = new EventEmitter();
  @Output() goBack = new EventEmitter();
  @Output() fileLogo = new EventEmitter();

  public matcher = new MyErrorStateMatcher();
  myForm: FormGroup;

  // image data
  public imagePath;
  imgURL: any;
  public message: string;

  public phoneRegex: any;
  public emailRegex: any;

  public createCleaced: boolean = false;
  public logoUploadSimple_active: boolean;
  public logoUploadCDN_active: boolean;

  constructor(
    private fb: FormBuilder,
    public regex: RegexService,
    private storage: LocalStorageService,
    private notifier: NotifierService,
    private config: ConfigService) {
    this.setConfig();
    this.initRegex(regex);
  }

  private setConfig(): void {
    this.logoUploadSimple_active = this.config.logoUploadSimple_active(); // upload to server
    this.logoUploadCDN_active = this.config.logoUploadCDN_active(); // upload care service
  }

  private initRegex(rgx): void {
    this.phoneRegex = rgx.phoneRegex();
    this.emailRegex = rgx.emailRegex();
  }

  ngOnInit() {
    this.initForm();
    this.subscribeForBusinessName();
  }

  private subscribeForBusinessName() {
    this.storage.observe('accountDetailsRegStep')
      .subscribe((newValue) => {
        this.myForm.controls['nameOfBusiness'].setValue(newValue.nameOfBusiness);
      })
  }

  private initForm(): void {
    let storage = this.storage.retrieve('affiliateSettingsRegStep');
    this.myForm = this.fb.group({
      nameOfBusiness: [this.getNameOfBusiness(), [
        Validators.required
      ]],
      chosenURL: [storage && storage.chosenURL || '', [
        Validators.required
      ]],
      email: [storage && storage.email || '', [
        Validators.pattern(this.emailRegex),
        Validators.required
      ]],
      phone: [storage && storage.phone || '', [
        Validators.pattern(this.phoneRegex),
        Validators.required
      ]],
      businessLogo: ['']
    });
    this.myForm.get('nameOfBusiness').disable();
  }

  private getNameOfBusiness(): string {
    return this.storage.retrieve('accountDetailsRegStep') && this.storage.retrieve('accountDetailsRegStep').nameOfBusiness || '';
  }

  // go next step
  public createAffiliate(): void {
    this.createCleaced = true;
    if (this.myForm.status === "VALID" && this.imgURL) {
      this.storage.store('affiliateSettingsRegStep', this.myForm.value);
      this.create.emit(this.myForm.value);
    }
    return;
  }

  // go prew step
  public goBackStep(): void {
    this.goBack.emit('affiliateSettingsRegStep');
  }


  // preview image for upload V1
  public preview(files): void {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.notifier.notify('error', 'Only images are supported.');
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.fileLogo.emit(files[0]);
  }

  public yourOnUploadHandler(event) {
    this.imgURL = event.cdnUrl;
    this.myForm.controls['businessLogo'].setValue(this.imgURL);
  }

}

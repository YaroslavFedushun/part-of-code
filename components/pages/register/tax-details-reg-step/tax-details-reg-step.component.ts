import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocalStorageService } from 'ngx-webstorage';
import { NotifierService } from 'angular-notifier';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface MyModel {
  taxId: string
}

@Component({
  selector: 'app-tax-details-reg-step',
  templateUrl: './tax-details-reg-step.component.html',
  styleUrls: ['./tax-details-reg-step.component.scss']
})
export class TaxDetailsRegStepComponent implements OnInit {

  @Output() goNext = new EventEmitter();
  @Output() goBack = new EventEmitter();
  @Output() formData = new EventEmitter();
  @Output() w9Form = new EventEmitter();

  public nextStepClicked: boolean = false;
  public matcher = new MyErrorStateMatcher();
  myForm: FormGroup;

  fileToUpload: File = null;

  constructor(
    private fb: FormBuilder,
    private storage: LocalStorageService,
    private notifier: NotifierService) {
  };

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    let storage = this.storage.retrieve('taxDetailsRegStep');
    this.myForm = this.fb.group({
      taxId: [storage && storage.taxId || '', [
        Validators.required
      ]]
    });
  }

  // go next step
  public goNextStep(): void {
    this.nextStepClicked = true;
    if (this.myForm.status === "VALID" && (this.fileToUpload))
      this.applyBeforeGo();
    return;
  }

  // go back step
  public goBackStep(): void {
    this.goBack.emit('taxDetailsRegStep');
  }

  public skipStep(): void {
    this.nextStepClicked = false;
    this.myForm.get('taxId').clearValidators();
    this.myForm.get('taxId').updateValueAndValidity();
    this.applyBeforeGo();
  }

  public applyBeforeGo(): void {
    this.storage.store('taxDetailsRegStep', this.myForm.value);
    this.formData.emit(this.myForm.value);
    this.w9Form.emit(this.fileToUpload);
    this.goNext.emit('taxDetailsRegStep');
  }

  public handleFileInput(files: FileList) {
    if (files[0].type.indexOf('pdf') !== -1)
      this.fileToUpload = files.item(0);
    else this.notifier.notify('error', 'Only .PDF are supported.');
  }


}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocalStorageService } from 'ngx-webstorage';
import { RegexService } from "../../../../services/regex.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export interface MyModel {
    nameOfBusiness: string,

    firstName: string,
    lastName: string,
    email: string,
    primaryPhone: string,
    secondaryPhone: string,

    secondaryContact: boolean,
    additionalFirstName: string,
    additionalLastName: string,
    additionalEmail: string,
    additionalPrimaryPhone: string,
    additionalSecondaryPhone: string
}

@Component({
    selector: 'app-account-details-reg-step',
    templateUrl: './account-details-reg-step.component.html',
    styleUrls: ['./account-details-reg-step.component.scss']
})

export class AccountDetailsRegStepComponent implements OnInit {
    @Output() goNext = new EventEmitter();
    @Output() formData = new EventEmitter<MyModel>();

    public matcher = new MyErrorStateMatcher();
    public namesRegex: any;
    public phoneRegex: any;

    myForm: FormGroup;
    parentContactForm: FormGroup;
    parentAdditionalContactForm: FormGroup;

    public contacts: [];

    constructor(
        private fb: FormBuilder,
        public regex: RegexService,
        private storage: LocalStorageService) {
        this.initRegex(regex);
    }

    ngOnInit() {
        this.initForm();
    }

    private initRegex(rgx): void {
        this.namesRegex = rgx.namesRegex();
        this.phoneRegex = rgx.phoneRegex();
    }

    private initForm(): void {
        let storage = this.storage.retrieve('accountDetailsRegStep');
        this.myForm = this.fb.group({
            nameOfBusiness: [storage && storage.nameOfBusiness || '', [
                Validators.required
            ]],
            secondaryContact: [storage && storage.secondaryContact || false],
        });
        this.parentContactForm = this.fb.group(this.setContactsForms('parentContactForm'));
        this.parentAdditionalContactForm = this.fb.group(this.setContactsForms('parentAdditionalContactForm'));
    }

    private setContactsForms(form): any {
        let storage = this.storage.retrieve(form);
        return {
            firstName: [storage && storage.firstName || '', [
                Validators.required,
                Validators.pattern(this.namesRegex)
            ]],
            lastName: [storage && storage.lastName || '', [
                Validators.required,
                Validators.pattern(this.namesRegex)
            ]],
            email: [storage && storage.email || '', [
                Validators.required,
                Validators.email
            ]],
            primaryPhone: [storage && storage.primaryPhone || '', [
                Validators.required,
                Validators.pattern(this.phoneRegex)
            ]],
            secondaryPhone: [storage && storage.secondaryPhone || '', [
                Validators.pattern(this.phoneRegex)]
            ]
        }
    }

    public submit(): void {
        if (this.myForm.status === "VALID" && this.parentContactForm.status === "VALID" &&
            (this.myForm.value.secondaryContact && this.parentAdditionalContactForm.status === "VALID"
                || !this.myForm.value.secondaryContact)) {
            this.saveDataToLocalStorage();
            this.sendData();
        } else this.showErrors();
        return;
    }

    private saveDataToLocalStorage(): void {
        this.storage.store('accountDetailsRegStep', this.myForm.value);
        this.storage.store('parentContactForm', this.parentContactForm.value);
        if (this.myForm.value.secondaryContact)
            this.storage.store('parentAdditionalContactForm', this.parentAdditionalContactForm.value);
    }

    // send data and go to next step
    private sendData() {
        this.formData.emit(this.groupData());
        this.goNext.emit('accountDetailsRegStep');
    }

    // prepare data to send
  private groupData(): MyModel {
        let body = Object.assign(
            this.myForm.value,
          this.parentContactForm.value,
        );
        body.additionalFirstName = this.myForm.value.secondaryContact && this.parentAdditionalContactForm.value.firstName || '';
        body.additionalLastName = this.myForm.value.secondaryContact && this.parentAdditionalContactForm.value.lastName || '';
        body.additionalEmail = this.myForm.value.secondaryContact && this.parentAdditionalContactForm.value.email || '';
        body.additionalPrimaryPhone = this.myForm.value.secondaryContact && this.parentAdditionalContactForm.value.primaryPhone || '';
        body.additionalSecondaryPhone = this.myForm.value.secondaryContact && this.parentAdditionalContactForm.value.secondaryPhone || '';
        return body;
    }

    private showErrors() {
        this.parentContactForm.markAllAsTouched();
        if (this.myForm.value.secondaryContact)
            this.parentAdditionalContactForm.markAllAsTouched();
    }

}

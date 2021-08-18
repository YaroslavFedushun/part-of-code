import { Component } from '@angular/core';
import { RequestService } from "../../../services/request.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent  {
    public hide: boolean = true;

    // forms data
    public accountDetailse: any;
    public address: any;
    public taxDetails: any;
    public affiliateSettings: any;
    public fileLogo: any;
    public w9Form: any;

    // steps visability
    public hide_1: boolean = false;
    public hide_2: boolean = true;
    public hide_3: boolean = true;
    public hide_4: boolean = true;
    public hide_thankYou: boolean = true;

    constructor(private RequestService: RequestService) {}

    // set Persents for steps
    public getPersents(): number {
        if (!this.hide_1)
            return 1;
        if (!this.hide_2)
            return 24;
        if (!this.hide_3)
            return 48;
        if (!this.hide_4)
            return 72;
        if (!this.hide_thankYou)
            return 100;
    }

    public createAffiliate(affiliateSettingsRegStep): void {
        let body = this.prepareDataForRequest(affiliateSettingsRegStep);
        this.RequestService.signUpAffiliate(body).then(() => this.goNextStep('thankYouPage'));
    }

    private prepareDataForRequest(affiliateSettingsRegStep): any {
        const formData = new FormData();
        if (this.w9Form) formData.append('w9Form', this.w9Form);
        if (this.fileLogo) formData.append('businessLogo', this.fileLogo);

        // merge forms
        let body = Object.assign(this.accountDetailse, this.taxDetails, this.address);
        for (var key in body) formData.append(key, body[key]);

        formData.append('AffiliateSettings.nameOfBusiness', this.accountDetailse.nameOfBusiness);
        for (var key in affiliateSettingsRegStep)
            formData.append('affiliateSettings.' + key, affiliateSettingsRegStep[key]);
        return formData;
    }



    // go next step
    public goNextStep(step: string): void {
        if (step === 'accountDetailsRegStep') {
            this.hide_1 = true;
            this.hide_2 = false;
            return;
        } if (step === 'taxDetailsRegStep') {
            this.hide_2 = true;
            this.hide_3 = false;
            return;
        }
        if (step === 'addressRegStep') {
            this.hide_3 = true;
            this.hide_4 = false;
            return;
        }
        if (step === 'thankYouPage') {
            this.hide_4 = true;
            this.hide_thankYou = false;
            return;
        }
        return;
    }

    // go back step
    public goBackStep(step: string): void {
        if (step === 'taxDetailsRegStep') {
            this.hide_1 = false;
            this.hide_2 = true;
        }
        if (step === 'addressRegStep') {
            this.hide_2 = false;
            this.hide_3 = true;
        }
        if (step === 'affiliateSettingsRegStep') {
            this.hide_3 = false;
            this.hide_4 = true;
        }
    }

}

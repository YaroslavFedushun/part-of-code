import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-contact-account-reg-step',
  templateUrl: './contact-account-reg-step.component.html',
  styleUrls: ['./contact-account-reg-step.component.scss']
})

export class ContactAccountRegStepComponent implements OnInit {
    @Input() myForm: FormGroup;

    constructor() {}

    ngOnInit() {}

}

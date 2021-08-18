import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from "../../../services/authentication.service";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public hide: boolean = true;
  public matcher = new MyErrorStateMatcher();
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  public login() {
    if (this.myForm.invalid) return;
    this.auth.login(this.myForm.value)
  }



}

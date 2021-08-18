import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from "./request.service";
import { LocalStorageService } from 'ngx-webstorage';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private router: Router,
    private RequestService: RequestService,
    private storage: LocalStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.storage.retrieve('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public login(body) {
    this.RequestService.login(body)
      .then((data) => this.authorizationInit(data))
  }

  private authorizationInit(body) {
    this.storage.store('currentUser', body.entity);
    this.currentUserSubject.next(body.entity);
    this.router.navigateByUrl('/dashboard');
  }

  public logout() {
    this.RequestService.logout()
      .then(() => {
        this.router.navigateByUrl('/login');
        this.storage.clear('currentUser');
        this.currentUserSubject.next(null);
      });
  }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  constructor(
    private _httpService: Http,
    public ngxService: NgxUiLoaderService,
    private notifier: NotifierService
  ) { }

  // **********************************
  // ********** IMPORT REQUESTS *******
  // **********************************

  public signUpAffiliate = (body): any => this.request('post', 'authorize/sign-up', body);
  public editAffiliate = (body): any => this.request('put', 'user/edit', body);
  public getUserData = (id): any => this.request('get', 'user' + '/' + id);

  public login = (body): any => this.request('post', 'authorize/login', body);
  public logout = (): any => this.request('post', 'authorize/logout');

  public createLead = (body): any => this.request('post', 'lead', body);
  public updateLead = (body): any => this.request('put', 'lead', body);




  // **********************************
  // *** BASE OPTIONS FOR REQUESTS ****
  // **********************************

  // BEFORE REQUEST
  private beforeRequest() {
    this.ngxService.start();
  }

  // BASE URL
  private baseUrl(): string {
    return window.location.origin + /api/;
  }

  // REQUEST
  private request(req, specUrl, body?, spyRequest?) {
    this.beforeRequest();

    if (!body) body = {};
    var promise = new Promise((resolve) => {
      const url = this.baseUrl() + specUrl;
      if (req === 'get') {
        // GET request
        this._httpService.get(url).subscribe(
          data => {
            data = this.parse(data);
            resolve(data);
            this.goodResponse(data);
          }, error => this.badResponse(error)
        );
      } else {
        // POST, PUT... requests
        this._httpService[req](url, body).subscribe(
          data => {
            data = this.parse(data);
            resolve(data);
            this.goodResponse(data);
          }, error => this.badResponse(error)
        );
      }
    });
    return promise;
  }

  private goodResponse(data) {
   
    this.afterRequest('success', data);
  }

  private badResponse(error) {
    error = this.parse(error);
    this.afterRequest('error', error);
  }

  // PARSE REQUEST FROM JSON
  private parse = (data): any => JSON.parse(data._body);

  // AFTER REQUEST
  private afterRequest(type, data) {
    this.ngxService.stop();
    let msng = data.title || data.message;
    if (msng) this.notify(type, msng);
  }

  // NOTIFY
  private notify(type, response) {
    setTimeout(() => {
      this.notifier.notify(type, response);
    }, 1000);
  }










}

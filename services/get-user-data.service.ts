import { Injectable } from '@angular/core';
import { RequestService } from "src/app/services/request.service";
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {

  constructor(
    private RequestService: RequestService,
    private storage: LocalStorageService
  ) { }

  public getUser(id) {
    this.RequestService.getUserData(id).then((data) => this.saveToLocalStorage(data));
  }

  private saveToLocalStorage(data) {
    data.affiliateSettings.headerCSS = JSON.parse(data.affiliateSettings.headerCSS);
    data.affiliateSettings.bodyCSS = JSON.parse(data.affiliateSettings.bodyCSS);
    this.storage.store('currentUser', data);
  }
}

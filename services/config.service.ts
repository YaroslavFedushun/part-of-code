import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public logoUploadSimple_active = (): boolean => false; // upload to server
  public logoUploadCDN_active = (): boolean => true; // upload care service

  public autocompleteAddressByGoogle_active = (): boolean => true;

  constructor() { }
}

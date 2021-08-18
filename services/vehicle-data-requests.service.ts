import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataRequestsService {
  //private response: any;
  //private baseApiUrl: string = window.location.origin + '/api/';
 
  constructor(/*private http: HttpClient*/) {}

  public getMakes = (model: string): string[] => ['make'];
  public getModels = (zip: string): string[] => ['makes'];

  //public getModels =()=> {
  //  this.http.get(this.baseApiUrl + 'getvehiclemakedata?state=NY')
  //    .subscribe((response) => {
  //    this.response = response;
  //    console.log(this.response);
  //  });
  //};

}

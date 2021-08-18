import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public imageUploaderV1 = (): boolean => false; // upload to server
    public imageUploaderV2 = (): boolean => true; // upload care service

    public fileUploaderV1 = (): boolean => true; // upload to server
    public fileUploaderV2 = (): boolean => false; // upload care service

    constructor() { }
}

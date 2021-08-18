import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexService {

  public namesRegex = ():any => /^[^0-9\$#@!%\^&\*\(\)\+:;\/?><]+$/;
  public phoneRegex = (): any => /^[2-9]{1}[0-9]{9}$/;
  public emailRegex = ():any => /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([A-Za-z]{2,6}(?:\.[A-Za-z]{2})?)$/;
  public vinRegex = ():any => /[0-9A-Za-z]{17}/;

  constructor() { }
}

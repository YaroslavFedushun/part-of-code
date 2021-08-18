import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  public rootHeaderStyle = {
    bg_color: '#ffffff',
    text_color: '#4c4c4c',
    icon_color: '#989898',
  };

  public rootBodyStyle = {
    bg_color: '#F8FAFC',
    body_main_color: '#557efa',
    btn_text_shadow: '1px 1px 1px #5a5a5a'
  };

  constructor() { }
}

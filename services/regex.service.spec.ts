import { TestBed } from '@angular/core/testing';

import { RegexService } from './regex.service';



describe('RegexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let service;

  beforeEach(() => {
   service = TestBed.get(RegexService);
  });

  it('RegexService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Names Regex should return data ', () => {
    expect(service.namesRegex).toBeTruthy();
  });

  it('Phone Regex should return data ', () => {
    expect(service.phoneRegex).toBeTruthy();
  });

  it('Email Regex should return data ', () => {
    expect(service.emailRegex).toBeTruthy();
  });

  it('Vin Regex should return data ', () => {
    expect(service.vinRegex).toBeTruthy();
  });

});

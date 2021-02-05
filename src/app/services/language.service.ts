import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  setLanguage(lang: string): void {
    sessionStorage.setItem('lang', lang);
  }

  getLanguage(): string {
    return sessionStorage.getItem('lang');
  }
}

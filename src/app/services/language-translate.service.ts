import { EventEmitter } from '@angular/core';
import * as EnglishStrings from '../resources/english';
import * as ArabicStrings from '../resources/arabic';
import * as UrduStrings from '../resources/urdu';


export class LanguageTranslateService {
  public currentLang: EventEmitter<string> = new EventEmitter();
  setLang(val) {
    this.currentLang.emit(val);
  }
  lang = 'en';
  
  getLangObject(lang) {
    switch(lang){
      case 'ar':
        return ArabicStrings;
      case 'ur':
          return UrduStrings;
      case 'en': 
      default:
        return EnglishStrings;
    }
  }
}
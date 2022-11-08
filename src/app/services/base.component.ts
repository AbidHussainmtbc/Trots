import { Injectable} from '@angular/core';
import { LanguageTranslateService } from './language-translate.service';

@Injectable()

export abstract class BaseComponent {
  langObject;

  constructor(public languageTranslateService:LanguageTranslateService) {
    this.languageTranslateService.currentLang.subscribe(lang => {
      const body = document.querySelector('body');
      body.setAttribute('dir', this._isRTL(lang) ? 'rtl': 'ltr');
      
      this.langObject = this.languageTranslateService.getLangObject(lang);
    });
  }
  _isRTL(lang){
    if(lang == 'ar' || lang == 'ur')
    return true;
  }
  ngOnInit(){
    this.languageTranslateService.setLang('en');
  }

}

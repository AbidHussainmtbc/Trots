import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationError, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseComponent } from './services/base.component';
import { IconsService } from './services/icons.service';
import { LanguageTranslateService } from './services/language-translate.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {

  componentInView = new Subject();

  title = 'trots';

  returnUrl;
  isMobile;

  constructor(
    private iconsService: IconsService, private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService, private router: Router,
    public languageTranslateService:LanguageTranslateService) {
      super(languageTranslateService);
    console.log('attempting to load application');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.componentInView))
      .subscribe(queryParams => {
        if (queryParams.returnUrl) {
          this.returnUrl = queryParams.returnUrl;
        }
      }, error => {
        console.error('Error while reading query params in app components', error);
      });
  }

  ngOnDestroy(): void {
    this.componentInView.next();
    this.componentInView.complete();
  }
}

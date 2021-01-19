import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsDatepickerConfig, BsDatepickerDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { ActiveService } from '../../shared/services/active.service';
import { AccountService } from '../../shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /*
  User =
    {
      fullName: 'גרמן ישייב',
      inDate: '02/04/2019',
      numberId: '314327735',
      oleId: '22132960',
      mobile: '0549452396',
      email: 'german.isaev@gmail.com'
      'English', 'Español', 'Português', 'Français', 'Русский'
    };
  */

  firstName: string;
  lastName: string;

  languages = [
    { key: 'he', value: 'עברית' },
    { key: 'fr', value: 'Français' },
    { key: 'es', value: 'Español' },
    { key: 'pt-br', value: 'Português' },
    { key: 'en', value: 'English' },
    { key: 'ru', value: 'Русский' }
  ];
  currentLang = 'he';
  localLang = 'he-IL';
  languageId = '0';
  currentFlag = false;
  today = new Date();

  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;

  @HostListener('window.scroll')
  onScrollEvent() {
    this.datepicker.hide();
  }

  datePickerConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();

  locale = 'he';
  locales = listLocales();
  //colorTheme = 'theme-green';

  constructor(
    private translate: TranslateService,
    private activeService: ActiveService,
    private bsLocaleService: BsLocaleService,
    private accountService: AccountService
    //private cdr: ChangeDetectorRef,
    //private session: SessionService
  ) {

    translate.addLangs(['he', 'fr', 'es', 'pt-br', 'en', 'ru']);
    translate.setDefaultLang('he');
    this.activeService.setStatus(this.currentFlag);

    this.bsLocaleService.use(this.locale);
    /*
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: true,
      isAnimated: true,
      customTodayClass: 'today',
      minDate: new Date(),
      maxDate: new Date()
    });
    */
    // localStorage.setItem('user', JSON.stringify(this.User));
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));//, JSON.stringify(this.User));
    this.firstName = user.FirstName;
    this.lastName = user.LastName;
  }

  onLayout() {
    this.accountService.logout();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.bsLocaleService.use(lang);
  }

  switchLanguage(lang: string) {

    if (lang === 'he') {
      this.currentFlag = false;
    }
    else {
      this.currentFlag = true;
    }

    switch (lang) {
      case 'he':
        this.languageId = '0';
        break;
      case 'fr':
        this.languageId = '1';
        break;
      case 'es':
        this.languageId = '2';
        break;
      case 'pt-br':
        this.languageId = '3';
        break;
      case 'en':
        this.languageId = '4';
        break;
      case 'ru':
        this.languageId = '5';
        break;
    }

    //console.log(this.currentFlag);
    this.activeService.setStatus(this.currentFlag);
    this.translate.use(lang);
    this.bsLocaleService.use(lang);

    //this.session.registerCulture(this.localLang);
    //this.refreshValues();
  }

  applyLocale(pop: any) {
    this.bsLocaleService.use(this.locale);
    //this.datePickerConfig = Object.assign({}, { containerClass: this.colorTheme });
    setTimeout(() => {
      pop.hide();
      pop.show();
    });
  }

  private refreshValues() {
    this.today = new Date();
    console.log('today');
    console.log(this.today);
    // this.val++;
  }

}

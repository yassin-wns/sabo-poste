import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should switch language to Arabic and set RTL', () => {
    service.setLanguage('ar');
    expect(service.currentLang).toBe('ar');
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
    expect(service.t('nav_home')).toBe('الرئيسية');
  });

  it('should switch language to French and set LTR', () => {
    service.setLanguage('fr');
    expect(service.currentLang).toBe('fr');
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
    expect(service.t('nav_home')).toBe('Accueil');
  });

  it('should switch language to English and set LTR', () => {
    service.setLanguage('en');
    expect(service.currentLang).toBe('en');
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
    expect(service.t('nav_home')).toBe('Home');
  });
});

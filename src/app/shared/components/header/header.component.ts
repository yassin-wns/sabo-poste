import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { Agency, LangCode } from '../../../core/models/models';
import { LocalizedPipe } from '../../pipes/localized.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LocalizedPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public mobileMenuOpen = false;
  public isAgencyOpen = false;
  public currentLang: LangCode = 'fr';
  public agency: Agency | null = null;
  private langSub!: Subscription;

  constructor(
    public langService: LanguageService,
    public authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.langSub = this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.evaluateAgencyStatus();
    });

    this.apiService.getAgency('bureau-sidi-ali-ben-aoun').subscribe({
      next: (data) => {
        this.agency = data;
        this.evaluateAgencyStatus();
      },
      error: () => {
        // Fallback calculation if server unreachable
        this.evaluateAgencyStatus();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.langSub) this.langSub.unsubscribe();
  }

  public setLanguage(lang: LangCode): void {
    this.langService.setLanguage(lang);
    this.mobileMenuOpen = false;
  }

  public toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  public closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  public evaluateAgencyStatus(): void {
    const now = new Date();
    const day = now.getDay(); // 0: Sunday, 1: Mon, ..., 6: Sat
    const hour = now.getHours();
    const minute = now.getMinutes();
    const totalMinutes = hour * 60 + minute;

    // Schedule:
    // Mon-Fri: 08:00 - 12:00 (480-720) & 14:00 - 17:00 (840-1020)
    // Sat: 08:00 - 12:00 (480-720)
    // Sun: Closed
    if (day >= 1 && day <= 5) {
      this.isAgencyOpen = (totalMinutes >= 480 && totalMinutes <= 720) || (totalMinutes >= 840 && totalMinutes <= 1020);
    } else if (day === 6) {
      this.isAgencyOpen = (totalMinutes >= 480 && totalMinutes <= 720);
    } else {
      this.isAgencyOpen = false;
    }
  }
}

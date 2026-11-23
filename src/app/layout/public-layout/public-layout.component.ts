import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ApiService } from '../../core/services/api.service';
import { PlatformSettings } from '../../core/models/models';
import { LocalizedPipe } from '../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ToastComponent, LocalizedPipe],
  template: `
    <div class="public-shell">
      <!-- Announcement Banner -->
      <div *ngIf="settings?.announcementActive" class="announcement-bar">
        <div class="container announcement-content">
          <span class="material-symbols-outlined ann-icon">campaign</span>
          <span class="ann-text">{{ settings?.announcement | localized }}</span>
        </div>
      </div>

      <app-header></app-header>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .public-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .main-content {
      flex: 1 0 auto;
    }
    .announcement-bar {
      background-color: var(--postal-gold);
      color: var(--navy-dark);
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.4rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }
    .announcement-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      text-align: center;
    }
    .ann-icon {
      font-size: 1.15rem;
      color: var(--primary-blue);
    }
  `]
})
export class PublicLayoutComponent implements OnInit {
  public settings: PlatformSettings | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSettings().subscribe({
      next: (s) => (this.settings = s),
      error: () => {}
    });
  }
}

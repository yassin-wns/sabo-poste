import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { NotificationService } from '../../core/services/notification.service';
import { User, LangCode } from '../../core/models/models';
import { LocalizedPipe } from '../../shared/pipes/localized.pipe';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ToastComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  public currentUser: User | null = null;
  public sidebarCollapsed = false;

  constructor(
    public authService: AuthService,
    public langService: LanguageService,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

  public logout(): void {
    this.authService.logout();
    this.notify.info('Vous êtes déconnecté.');
    this.router.navigate(['/login']);
  }

  public setLanguage(lang: LangCode): void {
    this.langService.setLanguage(lang);
  }

  public toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}

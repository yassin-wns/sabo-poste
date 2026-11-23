import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LanguageService } from '../../../core/services/language.service';
import { LocalizedPipe } from '../../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LocalizedPipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username = '';
  public password = '';
  public errorMessage = '';
  public isSubmitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService,
    public langService: LanguageService
  ) {}

  public onLogin(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Veuillez saisir votre nom d’utilisateur et mot de passe.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.username.trim(), this.password.trim()).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          this.notify.success('Connexion réussie ! Bienvenue sur l’espace administratif.');
          this.router.navigate(['/admin']);
        } else {
          this.errorMessage = res.message || 'Identifiants invalides.';
          this.notify.error(this.errorMessage);
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Erreur lors de la tentative de connexion.';
      }
    });
  }

  public prefillAdmin(): void {
    this.username = 'admin';
    this.password = 'admin';
    this.onLogin();
  }

  public prefillAgent(): void {
    this.username = 'agent_aoun';
    this.password = 'admin';
    this.onLogin();
  }
}

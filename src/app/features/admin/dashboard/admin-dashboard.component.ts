import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Agency, ContactMessage, LangCode, PostalService } from '../../../core/models/models';
import { LocalizedPipe } from '../../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LocalizedPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public activeTab: 'messages' | 'services' | 'agency' = 'messages';
  public messages: ContactMessage[] = [];
  public services: PostalService[] = [];
  public agency: Agency | null = null;
  public loading = true;
  public searchQuery = '';

  // Message modal
  public selectedMessage: ContactMessage | null = null;

  // Service modal
  public isServiceModalOpen = false;
  public isEditingService = false;
  public serviceForm: {
    id: string;
    categoryId: string;
    titleFr: string;
    titleAr: string;
    titleEn: string;
    summaryFr: string;
    summaryAr: string;
    summaryEn: string;
    icon: string;
    deliveryTime: string;
    requirements: string;
    steps: string;
  } = this.getEmptyServiceForm();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public langService: LanguageService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.loading = true;
    this.apiService.getMessages().subscribe({
      next: (msgs) => {
        this.messages = msgs;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });

    this.apiService.getServices().subscribe({
      next: (data) => (this.services = data)
    });

    this.apiService.getAgency('bureau-sidi-ali-ben-aoun').subscribe({
      next: (ag) => (this.agency = ag)
    });
  }

  public setTab(tab: 'messages' | 'services' | 'agency'): void {
    this.activeTab = tab;
  }

  // --- Message Management (Figure 10) ---
  public get filteredMessages(): ContactMessage[] {
    if (!this.searchQuery.trim()) return this.messages;
    const q = this.searchQuery.toLowerCase().trim();
    return this.messages.filter(m =>
      (m.fullName || '').toLowerCase().includes(q) ||
      (m.email || '').toLowerCase().includes(q) ||
      (m.subject || '').toLowerCase().includes(q) ||
      (m.message || '').toLowerCase().includes(q)
    );
  }

  public toggleReplied(msg: ContactMessage): void {
    if (!msg.id) return;
    const newStatus = msg.status === 'replied' ? 'pending' : 'replied';
    this.apiService.updateMessage(String(msg.id), { status: newStatus }).subscribe({
      next: (updated) => {
        msg.status = updated.status;
        this.notify.success(
          newStatus === 'replied' ? 'Message marqué comme répondu.' : 'Message remis en attente.'
        );
      },
      error: () => this.notify.error('Erreur lors de la mise à jour.')
    });
  }

  public deleteMessage(id: string | number | undefined): void {
    if (!id) return;
    if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
      this.apiService.deleteMessage(String(id)).subscribe({
        next: () => {
          this.messages = this.messages.filter(m => m.id !== id);
          this.notify.success('Message supprimé avec succès.');
        },
        error: () => this.notify.error('Erreur lors de la suppression.')
      });
    }
  }

  public openMessage(msg: ContactMessage): void {
    this.selectedMessage = msg;
  }

  public closeMessage(): void {
    this.selectedMessage = null;
  }

  // --- Services Management ---
  private getEmptyServiceForm() {
    return {
      id: '',
      categoryId: 'courrier-colis',
      titleFr: '',
      titleAr: '',
      titleEn: '',
      summaryFr: '',
      summaryAr: '',
      summaryEn: '',
      icon: 'local_post_office',
      deliveryTime: '24h - 48h',
      requirements: 'Carte d\'Identité Nationale (CIN)',
      steps: 'Se présenter au guichet'
    };
  }

  public openAddService(): void {
    this.isEditingService = false;
    this.serviceForm = this.getEmptyServiceForm();
    this.serviceForm.id = 'service-' + Date.now();
    this.isServiceModalOpen = true;
  }

  public openEditService(s: PostalService): void {
    this.isEditingService = true;
    this.serviceForm = {
      id: s.id,
      categoryId: s.categoryId,
      titleFr: s.title.fr || '',
      titleAr: s.title.ar || '',
      titleEn: s.title.en || '',
      summaryFr: s.summary.fr || '',
      summaryAr: s.summary.ar || '',
      summaryEn: s.summary.en || '',
      icon: s.icon || 'local_post_office',
      deliveryTime: s.deliveryTime.fr || '24h',
      requirements: (s.requirements.fr || []).join('\n'),
      steps: (s.steps.fr || []).join('\n')
    };
    this.isServiceModalOpen = true;
  }

  public closeServiceModal(): void {
    this.isServiceModalOpen = false;
  }

  public saveService(): void {
    if (!this.serviceForm.titleFr.trim()) {
      this.notify.warning('Veuillez renseigner au moins le titre du service.');
      return;
    }

    const payload: PostalService = {
      id: this.serviceForm.id,
      categoryId: this.serviceForm.categoryId,
      title: {
        fr: this.serviceForm.titleFr,
        ar: this.serviceForm.titleAr || this.serviceForm.titleFr,
        en: this.serviceForm.titleEn || this.serviceForm.titleFr
      },
      summary: {
        fr: this.serviceForm.summaryFr,
        ar: this.serviceForm.summaryAr || this.serviceForm.summaryFr,
        en: this.serviceForm.summaryEn || this.serviceForm.summaryFr
      },
      description: {
        fr: this.serviceForm.summaryFr,
        ar: this.serviceForm.summaryAr || this.serviceForm.summaryFr,
        en: this.serviceForm.summaryEn || this.serviceForm.summaryFr
      },
      icon: this.serviceForm.icon,
      requirements: {
        fr: this.serviceForm.requirements.split('\n').filter(r => r.trim().length > 0),
        ar: [this.serviceForm.requirements],
        en: [this.serviceForm.requirements]
      },
      steps: {
        fr: this.serviceForm.steps.split('\n').filter(st => st.trim().length > 0),
        ar: [this.serviceForm.steps],
        en: [this.serviceForm.steps]
      },
      deliveryTime: {
        fr: this.serviceForm.deliveryTime,
        ar: this.serviceForm.deliveryTime,
        en: this.serviceForm.deliveryTime
      },
      featured: true
    };

    if (this.isEditingService) {
      this.apiService.updateService(payload.id, payload).subscribe({
        next: (saved) => {
          const idx = this.services.findIndex(s => s.id === saved.id);
          if (idx !== -1) this.services[idx] = saved;
          this.notify.success('Service mis à jour avec succès.');
          this.closeServiceModal();
        },
        error: () => this.notify.error('Erreur lors de la mise à jour.')
      });
    } else {
      this.apiService.createService(payload).subscribe({
        next: (created) => {
          this.services.push(created);
          this.notify.success('Nouveau service ajouté avec succès.');
          this.closeServiceModal();
        },
        error: () => this.notify.error('Erreur lors de l\'ajout du service.')
      });
    }
  }

  public deleteService(id: string): void {
    if (confirm('Voulez-vous supprimer ce service ?')) {
      this.apiService.deleteService(id).subscribe({
        next: () => {
          this.services = this.services.filter(s => s.id !== id);
          this.notify.success('Service supprimé avec succès.');
        },
        error: () => this.notify.error('Erreur lors de la suppression.')
      });
    }
  }

  // --- Agency Management ---
  public saveAgency(): void {
    if (!this.agency) return;
    this.apiService.updateAgency(this.agency.id, this.agency).subscribe({
      next: () => this.notify.success('Informations de l\'agence enregistrées avec succès.'),
      error: () => this.notify.error('Erreur lors de l\'enregistrement.')
    });
  }

  // --- Auth & Language ---
  public setLang(lang: LangCode): void {
    this.langService.setLanguage(lang);
  }

  public logout(): void {
    this.authService.logout();
    this.notify.info('Vous êtes déconnecté.');
    this.router.navigate(['/login']);
  }

  public formatIcon(icon: string | undefined): string {
    if (!icon) return 'local_post_office';
    return icon.replace(/-/g, '_');
  }
}

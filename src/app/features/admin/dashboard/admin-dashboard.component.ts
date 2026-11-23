import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { LanguageService } from '../../../core/services/language.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ActivityLog, ContactMessage, MessageStatus } from '../../../core/models/models';
import { LocalizedPipe } from '../../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LocalizedPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public totalServices = 0;
  public totalCategories = 0;
  public totalArticles = 0;
  public totalGuides = 0;
  public totalFaqs = 0;
  public totalMessages = 0;
  public pendingMessages = 0;

  public recentMessages: ContactMessage[] = [];
  public activityLogs: ActivityLog[] = [];
  public loading = true;

  constructor(
    private apiService: ApiService,
    public langService: LanguageService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  public loadDashboardData(): void {
    this.loading = true;
    this.apiService.getServices().subscribe(data => this.totalServices = data.length);
    this.apiService.getCategories().subscribe(data => this.totalCategories = data.length);
    this.apiService.getArticles().subscribe(data => this.totalArticles = data.length);
    this.apiService.getGuides().subscribe(data => this.totalGuides = data.length);
    this.apiService.getFaqs().subscribe(data => this.totalFaqs = data.length);

    this.apiService.getMessages().subscribe(data => {
      this.totalMessages = data.length;
      this.pendingMessages = data.filter(m => m.status === 'pending').length;
      this.recentMessages = data.slice(0, 5);
      this.loading = false;
    });

    this.apiService.getActivityLogs().subscribe(logs => {
      this.activityLogs = logs.slice(0, 5);
    });
  }

  public updateMessageStatus(msg: ContactMessage, newStatus: MessageStatus): void {
    if (!msg.id) return;
    this.apiService.updateMessage(msg.id, { status: newStatus }).subscribe({
      next: (updated) => {
        msg.status = updated.status;
        this.notify.success(`Statut du message mis à jour : ${newStatus}`);
        this.loadDashboardData();
      },
      error: () => this.notify.error('Erreur lors de la mise à jour.')
    });
  }
}

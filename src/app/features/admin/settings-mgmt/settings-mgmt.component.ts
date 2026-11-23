import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { PlatformSettings } from '../../../core/models/models';

@Component({
  selector: 'app-settings-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-mgmt.component.html',
  styleUrls: ['./settings-mgmt.component.css']
})
export class SettingsMgmtComponent implements OnInit {
  public settings: PlatformSettings | null = null;
  public loading = true;
  public isSaving = false;

  constructor(
    private apiService: ApiService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.apiService.getSettings().subscribe({
      next: (data) => {
        this.settings = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Erreur lors du chargement des paramètres.');
      }
    });
  }

  public saveSettings(): void {
    if (!this.settings) return;
    this.isSaving = true;

    this.apiService.updateSettings(this.settings).subscribe({
      next: (updated) => {
        this.settings = updated;
        this.isSaving = false;
        this.notify.success('Paramètres enregistrés avec succès.');
      },
      error: () => {
        this.isSaving = false;
        this.notify.error('Erreur lors de l’enregistrement des paramètres.');
      }
    });
  }
}

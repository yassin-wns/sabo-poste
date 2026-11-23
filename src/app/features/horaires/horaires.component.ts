import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LanguageService } from '../../core/services/language.service';
import { Agency } from '../../core/models/models';
import { LocalizedPipe } from '../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-horaires',
  standalone: true,
  imports: [CommonModule, RouterModule, LocalizedPipe],
  templateUrl: './horaires.component.html',
  styleUrls: ['./horaires.component.css']
})
export class HorairesComponent implements OnInit {
  public agency: Agency | null = null;
  public isAgencyOpen = false;
  public todayName = '';
  public currentHourStr = '';

  public days = [
    { key: 'monday', labelKey: 'horaires_mon' },
    { key: 'tuesday', labelKey: 'horaires_tue' },
    { key: 'wednesday', labelKey: 'horaires_wed' },
    { key: 'thursday', labelKey: 'horaires_thu' },
    { key: 'friday', labelKey: 'horaires_fri' },
    { key: 'saturday', labelKey: 'horaires_sat' },
    { key: 'sunday', labelKey: 'horaires_sun' }
  ];

  constructor(
    private apiService: ApiService,
    public langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.apiService.getAgency('bureau-sidi-ali-ben-aoun').subscribe({
      next: (data) => {
        this.agency = data;
        this.evaluateStatus();
      },
      error: () => this.evaluateStatus()
    });
  }

  public evaluateStatus(): void {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const totalMinutes = hour * 60 + minute;

    const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    this.todayName = dayKeys[day];
    this.currentHourStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    if (day >= 1 && day <= 5) {
      this.isAgencyOpen = (totalMinutes >= 480 && totalMinutes <= 720) || (totalMinutes >= 840 && totalMinutes <= 1020);
    } else if (day === 6) {
      this.isAgencyOpen = (totalMinutes >= 480 && totalMinutes <= 720);
    } else {
      this.isAgencyOpen = false;
    }
  }

  public getScheduleForDay(dayKey: string): { morning: string; afternoon: string; status: string } {
    if (!this.agency || !this.agency.schedule) {
      if (dayKey === 'saturday') {
        return { morning: '08:00 - 12:00', afternoon: 'Fermé', status: 'half-day' };
      }
      if (dayKey === 'sunday') {
        return { morning: 'Fermé', afternoon: 'Fermé', status: 'closed' };
      }
      return { morning: '08:00 - 12:00', afternoon: '14:00 - 17:00', status: 'open' };
    }
    return (this.agency.schedule as any)[dayKey] || { morning: '', afternoon: '', status: 'closed' };
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" *ngIf="(notificationService.toasts$ | async)?.length">
      <div
        *ngFor="let toast of notificationService.toasts$ | async"
        class="toast"
        [ngClass]="'toast-' + toast.type"
        (click)="notificationService.dismiss(toast.id)">
        <span class="material-symbols-outlined icon">
          {{ toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info' }}
        </span>
        <span class="text">{{ toast.text }}</span>
      </div>
    </div>
  `
})
export class ToastComponent {
  constructor(public notificationService: NotificationService) {}
}

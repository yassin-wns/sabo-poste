import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  show(text: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 4000): void {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: ToastMessage = { id, type, text, duration };
    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
  }

  success(text: string, duration?: number): void {
    this.show(text, 'success', duration);
  }

  error(text: string, duration?: number): void {
    this.show(text, 'error', duration);
  }

  info(text: string, duration?: number): void {
    this.show(text, 'info', duration);
  }

  warning(text: string, duration?: number): void {
    this.show(text, 'warning', duration);
  }

  dismiss(id: string): void {
    const filtered = this.toastsSubject.value.filter(t => t.id !== id);
    this.toastsSubject.next(filtered);
  }
}

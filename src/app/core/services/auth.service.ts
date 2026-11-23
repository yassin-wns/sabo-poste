import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'sabo_poste_auth_user';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  private getStoredUser(): User | null {
    try {
      const data = localStorage.getItem(this.AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  public get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string): Observable<{ success: boolean; message?: string }> {
    // Demonstration Authentication matching the academic project context
    if ((username === 'admin' || username === 'agent_aoun') && (password === 'admin' || password === 'admin123' || password === '123456')) {
      const user: User = {
        id: username === 'admin' ? '1' : '2',
        username: username,
        fullName: username === 'admin' ? 'Administrateur SABO POSTE' : 'Agent Guichet Sidi Ali Ben Aoun',
        email: username === 'admin' ? 'admin@saboposte.poste.tn' : 'agent.aoun@poste.tn',
        role: username === 'admin' ? 'SuperAdmin' : 'Agent',
        active: true,
        createdAt: '2026-01-05'
      };
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of({ success: true });
    }
    return of({ success: false, message: 'Identifiants invalides (Démo: admin / admin)' });
  }

  public logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.currentUserSubject.next(null);
  }
}

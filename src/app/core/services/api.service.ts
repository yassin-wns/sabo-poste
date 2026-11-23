import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  ActivityLog,
  Agency,
  Article,
  Category,
  ContactMessage,
  FAQ,
  Guide,
  PlatformSettings,
  PostalService,
  User
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // ================= SERVICES =================
  getServices(): Observable<PostalService[]> {
    return this.http.get<PostalService[]>(`${this.baseUrl}/services`);
  }

  getServiceById(id: string): Observable<PostalService> {
    return this.http.get<PostalService>(`${this.baseUrl}/services/${id}`);
  }

  createService(service: PostalService): Observable<PostalService> {
    return this.http.post<PostalService>(`${this.baseUrl}/services`, service).pipe(
      tap(() => this.logActivity('Création Service', 'admin', `Ajout du service: ${service.id}`))
    );
  }

  updateService(id: string, service: PostalService): Observable<PostalService> {
    return this.http.put<PostalService>(`${this.baseUrl}/services/${id}`, service).pipe(
      tap(() => this.logActivity('Modification Service', 'admin', `Mise à jour du service: ${id}`))
    );
  }

  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/services/${id}`).pipe(
      tap(() => this.logActivity('Suppression Service', 'admin', `Suppression du service: ${id}`))
    );
  }

  // ================= CATEGORIES =================
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, category);
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
  }

  // ================= AGENCIES & SCHEDULE =================
  getAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${this.baseUrl}/agencies`);
  }

  getAgency(id: string): Observable<Agency> {
    return this.http.get<Agency>(`${this.baseUrl}/agencies/${id}`);
  }

  updateAgency(id: string, agency: Agency): Observable<Agency> {
    return this.http.put<Agency>(`${this.baseUrl}/agencies/${id}`, agency);
  }

  // ================= CONTACT MESSAGES =================
  getMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.baseUrl}/messages?_sort=createdAt&_order=desc`);
  }

  createMessage(message: ContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(`${this.baseUrl}/messages`, message);
  }

  updateMessage(id: string, data: Partial<ContactMessage>): Observable<ContactMessage> {
    return this.http.patch<ContactMessage>(`${this.baseUrl}/messages/${id}`, data);
  }

  deleteMessage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/messages/${id}`);
  }

  // ================= ARTICLES / NEWS =================
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles?_sort=date&_order=desc`);
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/${id}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.baseUrl}/articles`, article);
  }

  updateArticle(id: string, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.baseUrl}/articles/${id}`, article);
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/articles/${id}`);
  }

  // ================= GUIDES D17 =================
  getGuides(): Observable<Guide[]> {
    return this.http.get<Guide[]>(`${this.baseUrl}/guides`);
  }

  getGuideById(id: string): Observable<Guide> {
    return this.http.get<Guide>(`${this.baseUrl}/guides/${id}`);
  }

  createGuide(guide: Guide): Observable<Guide> {
    return this.http.post<Guide>(`${this.baseUrl}/guides`, guide);
  }

  updateGuide(id: string, guide: Guide): Observable<Guide> {
    return this.http.put<Guide>(`${this.baseUrl}/guides/${id}`, guide);
  }

  deleteGuide(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/guides/${id}`);
  }

  // ================= FAQ =================
  getFaqs(): Observable<FAQ[]> {
    return this.http.get<FAQ[]>(`${this.baseUrl}/faqs`);
  }

  createFaq(faq: FAQ): Observable<FAQ> {
    return this.http.post<FAQ>(`${this.baseUrl}/faqs`, faq);
  }

  updateFaq(id: string, faq: FAQ): Observable<FAQ> {
    return this.http.put<FAQ>(`${this.baseUrl}/faqs/${id}`, faq);
  }

  deleteFaq(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/faqs/${id}`);
  }

  // ================= USERS =================
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  // ================= SETTINGS =================
  getSettings(): Observable<PlatformSettings> {
    return this.http.get<PlatformSettings>(`${this.baseUrl}/settings`);
  }

  updateSettings(settings: Partial<PlatformSettings>): Observable<PlatformSettings> {
    return this.http.patch<PlatformSettings>(`${this.baseUrl}/settings`, settings);
  }

  // ================= AUDIT ACTIVITY LOGS =================
  getActivityLogs(): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(`${this.baseUrl}/activityLogs?_sort=timestamp&_order=desc`);
  }

  logActivity(action: string, user: string, details: string): void {
    const logItem: ActivityLog = {
      id: Date.now().toString(),
      action,
      user,
      details,
      timestamp: new Date().toISOString()
    };
    this.http.post<ActivityLog>(`${this.baseUrl}/activityLogs`, logItem).subscribe({
      error: () => {} // silent log handling
    });
  }
}

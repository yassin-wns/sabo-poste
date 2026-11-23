import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { LanguageService } from '../../core/services/language.service';
import { Agency, Article, Category, PostalService } from '../../core/models/models';
import { LocalizedPipe } from '../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LocalizedPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public categories: Category[] = [];
  public featuredServices: PostalService[] = [];
  public articles: Article[] = [];
  public agency: Agency | null = null;
  public searchQuery = '';
  public selectedService: PostalService | null = null;
  public isAgencyOpen = false;

  constructor(
    private apiService: ApiService,
    public langService: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getCategories().subscribe(cats => this.categories = cats);
    this.apiService.getServices().subscribe(services => {
      this.featuredServices = services.filter(s => s.featured);
    });
    this.apiService.getArticles().subscribe(arts => this.articles = arts.slice(0, 3));
    this.apiService.getAgency('bureau-sidi-ali-ben-aoun').subscribe(agency => {
      this.agency = agency;
      this.evaluateStatus();
    });
  }

  public onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/services'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }

  public openServiceDetail(service: PostalService): void {
    this.selectedService = service;
  }

  public closeServiceDetail(): void {
    this.selectedService = null;
  }

  public evaluateStatus(): void {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const totalMinutes = hour * 60 + minute;

    if (day >= 1 && day <= 5) {
      this.isAgencyOpen = (totalMinutes >= 480 && totalMinutes <= 720) || (totalMinutes >= 840 && totalMinutes <= 1020);
    } else if (day === 6) {
      this.isAgencyOpen = (totalMinutes >= 480 && totalMinutes <= 720);
    } else {
      this.isAgencyOpen = false;
    }
  }
}

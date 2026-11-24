import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { LanguageService } from '../../core/services/language.service';
import { Category, PostalService } from '../../core/models/models';
import { LocalizedPipe } from '../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LocalizedPipe],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  public services: PostalService[] = [];
  public categories: Category[] = [];
  public selectedCategory = 'all';
  public searchQuery = '';
  public selectedService: PostalService | null = null;
  public loading = true;

  constructor(
    private apiService: ApiService,
    public langService: LanguageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.apiService.getCategories().subscribe(cats => (this.categories = cats));
    this.apiService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
        this.route.queryParams.subscribe(params => {
          if (params['category']) {
            this.selectedCategory = params['category'];
          }
          if (params['q']) {
            this.searchQuery = params['q'];
          }
        });
      },
      error: () => (this.loading = false)
    });
  }

  public selectCategory(catId: string): void {
    this.selectedCategory = catId;
  }

  public get filteredServices(): PostalService[] {
    let result = this.services;

    if (this.selectedCategory !== 'all') {
      result = result.filter(s => s.categoryId === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(s => {
        const titleFr = (s.title.fr || '').toLowerCase();
        const titleAr = (s.title.ar || '').toLowerCase();
        const titleEn = (s.title.en || '').toLowerCase();
        const sumFr = (s.summary.fr || '').toLowerCase();
        const sumAr = (s.summary.ar || '').toLowerCase();
        const sumEn = (s.summary.en || '').toLowerCase();
        return (
          titleFr.includes(q) ||
          titleAr.includes(q) ||
          titleEn.includes(q) ||
          sumFr.includes(q) ||
          sumAr.includes(q) ||
          sumEn.includes(q)
        );
      });
    }

    return result;
  }

  public get postalServices(): PostalService[] {
    return this.filteredServices.filter(s => s.categoryId === 'courrier-colis');
  }

  public get financialServices(): PostalService[] {
    return this.filteredServices.filter(s => s.categoryId !== 'courrier-colis');
  }

  public openServiceDetail(service: PostalService): void {
    this.selectedService = service;
  }

  public closeServiceDetail(): void {
    this.selectedService = null;
  }
}

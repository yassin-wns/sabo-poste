import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { LanguageService } from '../../core/services/language.service';
import { FAQ } from '../../core/models/models';
import { LocalizedPipe } from '../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LocalizedPipe],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  public faqs: FAQ[] = [];
  public searchQuery = '';
  public selectedCategory = 'all';
  public openFaqIds: Set<string> = new Set();
  public loading = true;

  public categories: string[] = [];

  constructor(
    private apiService: ApiService,
    public langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.apiService.getFaqs().subscribe({
      next: (data) => {
        this.faqs = data;
        this.loading = false;
        // Collect categories
        const set = new Set<string>();
        data.forEach(f => set.add(f.category));
        this.categories = Array.from(set);
        // Default first open
        if (data.length > 0) {
          this.openFaqIds.add(data[0].id);
        }
      },
      error: () => (this.loading = false)
    });
  }

  public toggleFaq(id: string): void {
    if (this.openFaqIds.has(id)) {
      this.openFaqIds.delete(id);
    } else {
      this.openFaqIds.add(id);
    }
  }

  public isOpen(id: string): boolean {
    return this.openFaqIds.has(id);
  }

  public selectCategory(cat: string): void {
    this.selectedCategory = cat;
  }

  public get filteredFaqs(): FAQ[] {
    let result = this.faqs;

    if (this.selectedCategory !== 'all') {
      result = result.filter(f => f.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(f => {
        const qFr = f.question.fr.toLowerCase();
        const qAr = f.question.ar.toLowerCase();
        const qEn = f.question.en.toLowerCase();
        const aFr = f.answer.fr.toLowerCase();
        const aAr = f.answer.ar.toLowerCase();
        const aEn = f.answer.en.toLowerCase();
        return (
          qFr.includes(q) ||
          qAr.includes(q) ||
          qEn.includes(q) ||
          aFr.includes(q) ||
          aAr.includes(q) ||
          aEn.includes(q)
        );
      });
    }

    return result;
  }
}

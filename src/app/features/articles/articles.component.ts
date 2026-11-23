import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LanguageService } from '../../core/services/language.service';
import { Article } from '../../core/models/models';
import { LocalizedPipe } from '../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, RouterModule, LocalizedPipe],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  public articles: Article[] = [];
  public selectedArticle: Article | null = null;
  public loading = true;

  constructor(
    private apiService: ApiService,
    public langService: LanguageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.apiService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
        this.route.params.subscribe(params => {
          if (params['id']) {
            const found = this.articles.find(a => a.id === params['id']);
            if (found) this.selectedArticle = found;
          }
        });
      },
      error: () => (this.loading = false)
    });
  }

  public openArticle(article: Article): void {
    this.selectedArticle = article;
  }

  public closeArticle(): void {
    this.selectedArticle = null;
  }
}

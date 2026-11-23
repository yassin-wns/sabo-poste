import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Article } from '../../../core/models/models';
import { LocalizedPipe } from '../../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-articles-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-mgmt.component.html',
  styleUrls: ['./articles-mgmt.component.css']
})
export class ArticlesMgmtComponent implements OnInit {
  public articles: Article[] = [];
  public loading = true;

  public isEditModalOpen = false;
  public isDeleteModalOpen = false;
  public articleToDelete: Article | null = null;
  public isCreating = true;

  public currentArticle: Article = this.getEmptyArticle();

  constructor(
    private apiService: ApiService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  public loadArticles(): void {
    this.loading = true;
    this.apiService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Erreur lors du chargement des articles.');
      }
    });
  }

  public openCreateModal(): void {
    this.isCreating = true;
    this.currentArticle = this.getEmptyArticle();
    this.isEditModalOpen = true;
  }

  public openEditModal(art: Article): void {
    this.isCreating = false;
    this.currentArticle = JSON.parse(JSON.stringify(art));
    this.isEditModalOpen = true;
  }

  public saveArticle(): void {
    if (!this.currentArticle.title.fr || !this.currentArticle.category) {
      this.notify.warning('Veuillez renseigner le titre et la catégorie.');
      return;
    }

    if (this.isCreating) {
      this.currentArticle.id = Date.now().toString();
      if (!this.currentArticle.date) {
        this.currentArticle.date = new Date().toISOString().split('T')[0];
      }
      this.apiService.createArticle(this.currentArticle).subscribe({
        next: () => {
          this.notify.success('Article publié avec succès.');
          this.isEditModalOpen = false;
          this.loadArticles();
        },
        error: () => this.notify.error('Erreur lors de la publication.')
      });
    } else {
      this.apiService.updateArticle(this.currentArticle.id, this.currentArticle).subscribe({
        next: () => {
          this.notify.success('Article mis à jour avec succès.');
          this.isEditModalOpen = false;
          this.loadArticles();
        },
        error: () => this.notify.error('Erreur lors de la mise à jour.')
      });
    }
  }

  public confirmDelete(art: Article): void {
    this.articleToDelete = art;
    this.isDeleteModalOpen = true;
  }

  public executeDelete(): void {
    if (!this.articleToDelete) return;
    this.apiService.deleteArticle(this.articleToDelete.id).subscribe({
      next: () => {
        this.notify.success('Article supprimé.');
        this.isDeleteModalOpen = false;
        this.articleToDelete = null;
        this.loadArticles();
      },
      error: () => this.notify.error('Erreur lors de la suppression.')
    });
  }

  private getEmptyArticle(): Article {
    return {
      id: '',
      title: { fr: '', ar: '', en: '' },
      category: 'Actualité',
      author: 'Bureau de Poste Sidi Ali Ben Aoun',
      date: new Date().toISOString().split('T')[0],
      summary: { fr: '', ar: '', en: '' },
      content: { fr: '', ar: '', en: '' },
      featured: false
    };
  }
}

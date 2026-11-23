import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Category } from '../../../core/models/models';
import { LocalizedPipe } from '../../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-categories-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-mgmt.component.html',
  styleUrls: ['./categories-mgmt.component.css']
})
export class CategoriesMgmtComponent implements OnInit {
  public categories: Category[] = [];
  public loading = true;

  public isEditModalOpen = false;
  public isDeleteModalOpen = false;
  public categoryToDelete: Category | null = null;
  public isCreating = true;

  public currentCategory: Category = this.getEmptyCategory();

  constructor(
    private apiService: ApiService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  public loadCategories(): void {
    this.loading = true;
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Erreur lors du chargement des catégories.');
      }
    });
  }

  public openCreateModal(): void {
    this.isCreating = true;
    this.currentCategory = this.getEmptyCategory();
    this.isEditModalOpen = true;
  }

  public openEditModal(cat: Category): void {
    this.isCreating = false;
    this.currentCategory = JSON.parse(JSON.stringify(cat));
    this.isEditModalOpen = true;
  }

  public saveCategory(): void {
    if (!this.currentCategory.name.fr || !this.currentCategory.id) {
      this.notify.warning('Veuillez renseigner le nom et l’identifiant.');
      return;
    }

    if (this.isCreating) {
      this.apiService.createCategory(this.currentCategory).subscribe({
        next: () => {
          this.notify.success('Catégorie ajoutée avec succès.');
          this.isEditModalOpen = false;
          this.loadCategories();
        },
        error: () => this.notify.error('Erreur lors de la création.')
      });
    } else {
      this.apiService.updateCategory(this.currentCategory.id, this.currentCategory).subscribe({
        next: () => {
          this.notify.success('Catégorie mise à jour avec succès.');
          this.isEditModalOpen = false;
          this.loadCategories();
        },
        error: () => this.notify.error('Erreur lors de la mise à jour.')
      });
    }
  }

  public confirmDelete(cat: Category): void {
    this.categoryToDelete = cat;
    this.isDeleteModalOpen = true;
  }

  public executeDelete(): void {
    if (!this.categoryToDelete) return;
    this.apiService.deleteCategory(this.categoryToDelete.id).subscribe({
      next: () => {
        this.notify.success(`Catégorie supprimée: ${this.categoryToDelete?.name.fr}`);
        this.isDeleteModalOpen = false;
        this.categoryToDelete = null;
        this.loadCategories();
      },
      error: () => this.notify.error('Erreur lors de la suppression.')
    });
  }

  private getEmptyCategory(): Category {
    return {
      id: '',
      name: { fr: '', ar: '', en: '' },
      description: { fr: '', ar: '', en: '' },
      icon: 'folder',
      count: 0
    };
  }
}

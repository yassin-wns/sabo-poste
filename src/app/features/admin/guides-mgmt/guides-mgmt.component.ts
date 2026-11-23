import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Guide, GuideStep } from '../../../core/models/models';
import { LocalizedPipe } from '../../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-guides-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guides-mgmt.component.html',
  styleUrls: ['./guides-mgmt.component.css']
})
export class GuidesMgmtComponent implements OnInit {
  public guides: Guide[] = [];
  public loading = true;

  public isEditModalOpen = false;
  public isDeleteModalOpen = false;
  public guideToDelete: Guide | null = null;
  public isCreating = true;

  public currentGuide: Guide = this.getEmptyGuide();

  constructor(
    private apiService: ApiService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadGuides();
  }

  public loadGuides(): void {
    this.loading = true;
    this.apiService.getGuides().subscribe({
      next: (data) => {
        this.guides = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Erreur lors du chargement des guides D17.');
      }
    });
  }

  public openCreateModal(): void {
    this.isCreating = true;
    this.currentGuide = this.getEmptyGuide();
    this.isEditModalOpen = true;
  }

  public openEditModal(g: Guide): void {
    this.isCreating = false;
    this.currentGuide = JSON.parse(JSON.stringify(g));
    this.isEditModalOpen = true;
  }

  public addStep(): void {
    const nextNumber = this.currentGuide.steps.length + 1;
    this.currentGuide.steps.push({
      stepNumber: nextNumber,
      title: { fr: `Étape ${nextNumber}`, ar: `المرحلة ${nextNumber}`, en: `Step ${nextNumber}` },
      description: { fr: '', ar: '', en: '' }
    });
  }

  public removeStep(index: number): void {
    this.currentGuide.steps.splice(index, 1);
    this.currentGuide.steps.forEach((st, idx) => (st.stepNumber = idx + 1));
  }

  public saveGuide(): void {
    if (!this.currentGuide.title.fr || !this.currentGuide.category) {
      this.notify.warning('Veuillez renseigner le titre et la catégorie.');
      return;
    }

    if (this.isCreating) {
      if (!this.currentGuide.id) {
        this.currentGuide.id = 'guide-' + Date.now();
      }
      this.apiService.createGuide(this.currentGuide).subscribe({
        next: () => {
          this.notify.success('Guide D17 créé avec succès.');
          this.isEditModalOpen = false;
          this.loadGuides();
        },
        error: () => this.notify.error('Erreur lors de la création du guide.')
      });
    } else {
      this.apiService.updateGuide(this.currentGuide.id, this.currentGuide).subscribe({
        next: () => {
          this.notify.success('Guide D17 mis à jour.');
          this.isEditModalOpen = false;
          this.loadGuides();
        },
        error: () => this.notify.error('Erreur lors de la mise à jour.')
      });
    }
  }

  public confirmDelete(g: Guide): void {
    this.guideToDelete = g;
    this.isDeleteModalOpen = true;
  }

  public executeDelete(): void {
    if (!this.guideToDelete) return;
    this.apiService.deleteGuide(this.guideToDelete.id).subscribe({
      next: () => {
        this.notify.success('Guide supprimé.');
        this.isDeleteModalOpen = false;
        this.guideToDelete = null;
        this.loadGuides();
      },
      error: () => this.notify.error('Erreur lors de la suppression.')
    });
  }

  private getEmptyGuide(): Guide {
    return {
      id: '',
      title: { fr: '', ar: '', en: '' },
      category: 'D17 Mobile',
      readTime: '3 min',
      steps: [
        {
          stepNumber: 1,
          title: { fr: 'Étape 1', ar: 'المرحلة 1', en: 'Step 1' },
          description: { fr: '', ar: '', en: '' }
        }
      ]
    };
  }
}

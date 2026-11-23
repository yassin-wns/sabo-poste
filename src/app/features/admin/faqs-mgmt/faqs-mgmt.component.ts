import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { FAQ } from '../../../core/models/models';
import { LocalizedPipe } from '../../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-faqs-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faqs-mgmt.component.html',
  styleUrls: ['./faqs-mgmt.component.css']
})
export class FaqsMgmtComponent implements OnInit {
  public faqs: FAQ[] = [];
  public loading = true;

  public isEditModalOpen = false;
  public isDeleteModalOpen = false;
  public faqToDelete: FAQ | null = null;
  public isCreating = true;

  public currentFaq: FAQ = this.getEmptyFaq();

  constructor(
    private apiService: ApiService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadFaqs();
  }

  public loadFaqs(): void {
    this.loading = true;
    this.apiService.getFaqs().subscribe({
      next: (data) => {
        this.faqs = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Erreur lors du chargement des FAQs.');
      }
    });
  }

  public openCreateModal(): void {
    this.isCreating = true;
    this.currentFaq = this.getEmptyFaq();
    this.isEditModalOpen = true;
  }

  public openEditModal(f: FAQ): void {
    this.isCreating = false;
    this.currentFaq = JSON.parse(JSON.stringify(f));
    this.isEditModalOpen = true;
  }

  public saveFaq(): void {
    if (!this.currentFaq.question.fr || !this.currentFaq.answer.fr) {
      this.notify.warning('Veuillez renseigner la question et la réponse en français.');
      return;
    }

    if (this.isCreating) {
      this.currentFaq.id = Date.now().toString();
      this.apiService.createFaq(this.currentFaq).subscribe({
        next: () => {
          this.notify.success('Question FAQ créée.');
          this.isEditModalOpen = false;
          this.loadFaqs();
        },
        error: () => this.notify.error('Erreur lors de la création.')
      });
    } else {
      this.apiService.updateFaq(this.currentFaq.id, this.currentFaq).subscribe({
        next: () => {
          this.notify.success('Question FAQ mise à jour.');
          this.isEditModalOpen = false;
          this.loadFaqs();
        },
        error: () => this.notify.error('Erreur lors de la mise à jour.')
      });
    }
  }

  public confirmDelete(f: FAQ): void {
    this.faqToDelete = f;
    this.isDeleteModalOpen = true;
  }

  public executeDelete(): void {
    if (!this.faqToDelete) return;
    this.apiService.deleteFaq(this.faqToDelete.id).subscribe({
      next: () => {
        this.notify.success('FAQ supprimée.');
        this.isDeleteModalOpen = false;
        this.faqToDelete = null;
        this.loadFaqs();
      },
      error: () => this.notify.error('Erreur lors de la suppression.')
    });
  }

  private getEmptyFaq(): FAQ {
    return {
      id: '',
      category: 'D17',
      question: { fr: '', ar: '', en: '' },
      answer: { fr: '', ar: '', en: '' }
    };
  }
}

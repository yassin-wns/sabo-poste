import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Category, PostalService } from '../../../core/models/models';
import { LocalizedPipe } from '../../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-services-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule, LocalizedPipe],
  templateUrl: './services-mgmt.component.html',
  styleUrls: ['./services-mgmt.component.css']
})
export class ServicesMgmtComponent implements OnInit {
  public services: PostalService[] = [];
  public categories: Category[] = [];
  public searchQuery = '';
  public selectedCategory = 'all';
  public loading = true;

  // Modal States
  public isEditModalOpen = false;
  public isDeleteModalOpen = false;
  public serviceToDelete: PostalService | null = null;

  // Current Form Model
  public currentService: PostalService = this.getEmptyService();
  public isCreating = true;

  // Requirement & Step text buffers (line separated)
  public reqsFrBuffer = '';
  public reqsArBuffer = '';
  public reqsEnBuffer = '';
  public stepsFrBuffer = '';
  public stepsArBuffer = '';
  public stepsEnBuffer = '';

  constructor(
    private apiService: ApiService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.loading = true;
    this.apiService.getCategories().subscribe(cats => this.categories = cats);
    this.apiService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Erreur lors du chargement des services.');
      }
    });
  }

  public get filteredServices(): PostalService[] {
    let list = this.services;
    if (this.selectedCategory !== 'all') {
      list = list.filter(s => s.categoryId === this.selectedCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(s =>
        s.title.fr.toLowerCase().includes(q) ||
        s.title.ar.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
      );
    }
    return list;
  }

  public openCreateModal(): void {
    this.isCreating = true;
    this.currentService = this.getEmptyService();
    this.reqsFrBuffer = '';
    this.reqsArBuffer = '';
    this.reqsEnBuffer = '';
    this.stepsFrBuffer = '';
    this.stepsArBuffer = '';
    this.stepsEnBuffer = '';
    this.isEditModalOpen = true;
  }

  public openEditModal(service: PostalService): void {
    this.isCreating = false;
    this.currentService = JSON.parse(JSON.stringify(service));
    this.reqsFrBuffer = (this.currentService.requirements?.fr || []).join('\n');
    this.reqsArBuffer = (this.currentService.requirements?.ar || []).join('\n');
    this.reqsEnBuffer = (this.currentService.requirements?.en || []).join('\n');
    this.stepsFrBuffer = (this.currentService.steps?.fr || []).join('\n');
    this.stepsArBuffer = (this.currentService.steps?.ar || []).join('\n');
    this.stepsEnBuffer = (this.currentService.steps?.en || []).join('\n');
    this.isEditModalOpen = true;
  }

  public saveService(): void {
    if (!this.currentService.title.fr || !this.currentService.categoryId) {
      this.notify.warning('Veuillez renseigner le titre et la catégorie.');
      return;
    }

    // Populate arrays from buffers
    this.currentService.requirements = {
      fr: this.reqsFrBuffer.split('\n').map(s => s.trim()).filter(s => !!s),
      ar: this.reqsArBuffer.split('\n').map(s => s.trim()).filter(s => !!s),
      en: this.reqsEnBuffer.split('\n').map(s => s.trim()).filter(s => !!s)
    };
    this.currentService.steps = {
      fr: this.stepsFrBuffer.split('\n').map(s => s.trim()).filter(s => !!s),
      ar: this.stepsArBuffer.split('\n').map(s => s.trim()).filter(s => !!s),
      en: this.stepsEnBuffer.split('\n').map(s => s.trim()).filter(s => !!s)
    };

    if (this.isCreating) {
      if (!this.currentService.id) {
        this.currentService.id = this.slugify(this.currentService.title.fr);
      }
      this.apiService.createService(this.currentService).subscribe({
        next: () => {
          this.notify.success('Service créé avec succès.');
          this.isEditModalOpen = false;
          this.loadData();
        },
        error: () => this.notify.error('Erreur lors de la création du service.')
      });
    } else {
      this.apiService.updateService(this.currentService.id, this.currentService).subscribe({
        next: () => {
          this.notify.success('Service mis à jour avec succès.');
          this.isEditModalOpen = false;
          this.loadData();
        },
        error: () => this.notify.error('Erreur lors de la mise à jour du service.')
      });
    }
  }

  public confirmDelete(service: PostalService): void {
    this.serviceToDelete = service;
    this.isDeleteModalOpen = true;
  }

  public executeDelete(): void {
    if (!this.serviceToDelete) return;
    this.apiService.deleteService(this.serviceToDelete.id).subscribe({
      next: () => {
        this.notify.success(`Service supprimé: ${this.serviceToDelete?.title.fr}`);
        this.isDeleteModalOpen = false;
        this.serviceToDelete = null;
        this.loadData();
      },
      error: () => this.notify.error('Erreur lors de la suppression.')
    });
  }

  private getEmptyService(): PostalService {
    return {
      id: '',
      categoryId: 'courrier-colis',
      title: { fr: '', ar: '', en: '' },
      summary: { fr: '', ar: '', en: '' },
      description: { fr: '', ar: '', en: '' },
      icon: 'local_post_office',
      requirements: { fr: [], ar: [], en: [] },
      steps: { fr: [], ar: [], en: [] },
      deliveryTime: { fr: 'Immédiat', ar: 'فوري', en: 'Immediate' },
      featured: false,
      isPopular: false
    };
  }

  private slugify(text: string): string {
    return text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
}

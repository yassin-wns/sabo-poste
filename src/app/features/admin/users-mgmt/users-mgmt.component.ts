import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { User } from '../../../core/models/models';

@Component({
  selector: 'app-users-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-mgmt.component.html',
  styleUrls: ['./users-mgmt.component.css']
})
export class UsersMgmtComponent implements OnInit {
  public users: User[] = [];
  public loading = true;

  public isEditModalOpen = false;
  public isDeleteModalOpen = false;
  public userToDelete: User | null = null;
  public isCreating = true;

  public currentUser: User = this.getEmptyUser();

  constructor(
    private apiService: ApiService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.loading = true;
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Erreur lors du chargement des utilisateurs.');
      }
    });
  }

  public openCreateModal(): void {
    this.isCreating = true;
    this.currentUser = this.getEmptyUser();
    this.isEditModalOpen = true;
  }

  public openEditModal(u: User): void {
    this.isCreating = false;
    this.currentUser = JSON.parse(JSON.stringify(u));
    this.isEditModalOpen = true;
  }

  public saveUser(): void {
    if (!this.currentUser.username || !this.currentUser.fullName || !this.currentUser.email) {
      this.notify.warning('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (this.isCreating) {
      this.currentUser.id = Date.now().toString();
      this.currentUser.createdAt = new Date().toISOString().split('T')[0];
      this.apiService.createUser(this.currentUser).subscribe({
        next: () => {
          this.notify.success('Utilisateur créé avec succès.');
          this.isEditModalOpen = false;
          this.loadUsers();
        },
        error: () => this.notify.error('Erreur lors de la création.')
      });
    } else {
      this.apiService.updateUser(this.currentUser.id, this.currentUser).subscribe({
        next: () => {
          this.notify.success('Utilisateur mis à jour.');
          this.isEditModalOpen = false;
          this.loadUsers();
        },
        error: () => this.notify.error('Erreur lors de la mise à jour.')
      });
    }
  }

  public confirmDelete(u: User): void {
    if (u.username === 'admin') {
      this.notify.warning('Le compte SuperAdmin par défaut ne peut pas être supprimé.');
      return;
    }
    this.userToDelete = u;
    this.isDeleteModalOpen = true;
  }

  public executeDelete(): void {
    if (!this.userToDelete) return;
    this.apiService.deleteUser(this.userToDelete.id).subscribe({
      next: () => {
        this.notify.success('Utilisateur supprimé.');
        this.isDeleteModalOpen = false;
        this.userToDelete = null;
        this.loadUsers();
      },
      error: () => this.notify.error('Erreur lors de la suppression.')
    });
  }

  private getEmptyUser(): User {
    return {
      id: '',
      username: '',
      fullName: '',
      email: '',
      role: 'Agent',
      active: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
  }
}

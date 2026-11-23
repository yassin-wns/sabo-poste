import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ContactMessage, MessageStatus } from '../../../core/models/models';

@Component({
  selector: 'app-messages-mgmt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages-mgmt.component.html',
  styleUrls: ['./messages-mgmt.component.css']
})
export class MessagesMgmtComponent implements OnInit {
  public messages: ContactMessage[] = [];
  public selectedStatus = 'all';
  public searchQuery = '';
  public loading = true;

  public activeMessage: ContactMessage | null = null;
  public isDetailModalOpen = false;
  public isDeleteModalOpen = false;
  public messageToDelete: ContactMessage | null = null;
  public tempAdminNote = '';

  constructor(
    private apiService: ApiService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  public loadMessages(): void {
    this.loading = true;
    this.apiService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Erreur lors du chargement des messages.');
      }
    });
  }

  public get filteredMessages(): ContactMessage[] {
    let list = this.messages;
    if (this.selectedStatus !== 'all') {
      list = list.filter(m => m.status === this.selectedStatus);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(m =>
        m.fullName.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    }
    return list;
  }

  public openDetail(msg: ContactMessage): void {
    this.activeMessage = msg;
    this.tempAdminNote = msg.adminNote || '';
    this.isDetailModalOpen = true;
  }

  public updateStatus(newStatus: MessageStatus): void {
    if (!this.activeMessage || !this.activeMessage.id) return;
    this.apiService.updateMessage(this.activeMessage.id, {
      status: newStatus,
      adminNote: this.tempAdminNote
    }).subscribe({
      next: (updated) => {
        this.activeMessage!.status = updated.status;
        this.activeMessage!.adminNote = updated.adminNote;
        this.notify.success('Message mis à jour avec succès.');
        this.loadMessages();
      },
      error: () => this.notify.error('Erreur lors de la mise à jour.')
    });
  }

  public saveNote(): void {
    if (!this.activeMessage || !this.activeMessage.id) return;
    this.apiService.updateMessage(this.activeMessage.id, {
      adminNote: this.tempAdminNote
    }).subscribe({
      next: (updated) => {
        this.activeMessage!.adminNote = updated.adminNote;
        this.notify.success('Note interne enregistrée.');
        this.loadMessages();
      },
      error: () => this.notify.error('Erreur lors de l’enregistrement de la note.')
    });
  }

  public confirmDelete(msg: ContactMessage): void {
    this.messageToDelete = msg;
    this.isDeleteModalOpen = true;
  }

  public executeDelete(): void {
    if (!this.messageToDelete || !this.messageToDelete.id) return;
    this.apiService.deleteMessage(this.messageToDelete.id).subscribe({
      next: () => {
        this.notify.success('Message supprimé de l’inbox.');
        this.isDeleteModalOpen = false;
        if (this.activeMessage?.id === this.messageToDelete?.id) {
          this.isDetailModalOpen = false;
          this.activeMessage = null;
        }
        this.messageToDelete = null;
        this.loadMessages();
      },
      error: () => this.notify.error('Erreur lors de la suppression.')
    });
  }
}

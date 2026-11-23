import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { LanguageService } from '../../core/services/language.service';
import { NotificationService } from '../../core/services/notification.service';
import { ContactMessage } from '../../core/models/models';
import { LocalizedPipe } from '../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizedPipe],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contactForm!: FormGroup;
  public isSubmitting = false;
  public submitSuccess = false;
  public submitError = false;

  public categories = [
    'D17 & Portefeuille Mobile',
    'Cartes e-DINAR (SMART, Jeune, PRO)',
    'Mandats & Transferts d’argent',
    'Courrier & Colis CPX',
    'Paiement Factures (STEG / SONEDE / Télécom)',
    'Services Monétiques & Microfinance',
    'Horaires & Informations Générales',
    'Autre Demande'
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public langService: LanguageService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[+0-9\s-]{8,15}$/)]],
      category: ['D17 & Portefeuille Mobile', Validators.required],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
    });
  }

  public onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.notify.warning('Veuillez remplir correctement tous les champs obligatoires.');
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const formValues = this.contactForm.value;
    const newMessage: ContactMessage = {
      fullName: formValues.fullName.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone ? formValues.phone.trim() : undefined,
      category: formValues.category,
      subject: formValues.subject.trim(),
      message: formValues.message.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    this.apiService.createMessage(newMessage).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.notify.success(this.langService.t('form_success'));
        this.contactForm.reset({
          category: 'D17 & Portefeuille Mobile'
        });
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = true;
        this.notify.error(this.langService.t('form_error'));
      }
    });
  }

  public isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}

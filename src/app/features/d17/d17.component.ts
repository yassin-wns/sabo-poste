import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LanguageService } from '../../core/services/language.service';
import { Guide } from '../../core/models/models';
import { LocalizedPipe } from '../../shared/pipes/localized.pipe';

@Component({
  selector: 'app-d17',
  standalone: true,
  imports: [CommonModule, RouterModule, LocalizedPipe],
  templateUrl: './d17.component.html',
  styleUrls: ['./d17.component.css']
})
export class D17Component implements OnInit {
  public guides: Guide[] = [];
  public activeGuideIndex = 0;

  public compatibleCards = [
    { name: 'e-DINAR SMART', category: 'Grand Public', icon: 'credit_card', desc: 'Retraits GAB, paiements TPE et web' },
    { name: 'e-DINAR Jeune', category: 'Étudiants & Élèves', icon: 'school', desc: 'Inscriptions universitaires et bourses' },
    { name: 'e-DINAR PRO', category: 'Professionnels', icon: 'business_center', desc: 'Commerçants, artisans et PME' },
    { name: 'e-DINAR Corporate', category: 'Entreprises', icon: 'apartment', desc: 'Gestion de trésorerie d’entreprise' },
    { name: 'DigiCard', category: 'Partenaire Numérique', icon: 'contactless', desc: 'Paiements électroniques sécurisés' },
    { name: 'Mobi Tamkeen', category: 'Inclusion Sociale', icon: 'handshake', desc: 'Aides sociales et micro-finances' },
    { name: 'Mobi Tasshil', category: 'Micro-Crédits', icon: 'payments', desc: 'Remboursements facilités de prêts' },
    { name: 'Mobitamweel / Mobilcred', category: 'Financement', icon: 'account_balance', desc: 'Prêts agricoles et artisanaux' },
    { name: 'Sobflous', category: 'Portefeuille Web', icon: 'account_balance_wallet', desc: 'Recharges de services en ligne' },
    { name: 'Farmasi / Forever / Macoco', category: 'Vente Directe', icon: 'storefront', desc: 'Paiement direct de commandes' }
  ];

  public d17Faqs = [
    {
      q: 'Est-il nécessaire d’avoir un compte bancaire pour utiliser D17 ?',
      a: 'Non. Une simple carte prépayée e-DINAR (SMART, Jeune ou PRO) achetée au bureau de poste suffit pour activer D17.'
    },
    {
      q: 'Comment réagir si mon compte D17 est bloqué ?',
      a: 'Après 3 tentatives de PIN erronées, la carte se verrouille pour votre sécurité. Présentez-vous au guichet de Sidi Ali Ben Aoun avec votre CIN pour débloquer votre accès en 2 minutes.'
    },
    {
      q: 'Quels sont les frais de transfert par D17 ?',
      a: 'Les transferts de carte à carte ou le paiement des factures bénéficient de tarifs préférentiels très bas par rapport aux agences bancaires classiques.'
    }
  ];

  constructor(
    private apiService: ApiService,
    public langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.apiService.getGuides().subscribe(guides => {
      this.guides = guides;
    });
  }

  public selectGuide(index: number): void {
    this.activeGuideIndex = index;
  }
}

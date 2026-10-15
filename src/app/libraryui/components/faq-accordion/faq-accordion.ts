import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  helpful?: { yes: number; no: number };
}

export interface FaqCategory {
  id: string;
  name: string;
  items: FaqItem[];
}

@Component({
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet],
  selector: 'app-faq-accordion',
  styleUrl: './faq-accordion.css',
  templateUrl: './faq-accordion.html',
})
export class FaqAccordionPage {
  searchQuery = '';
  activeCategory = 'general';

  categories: FaqCategory[] = [
    {
      id: 'general',
      name: 'Général',
      items: [
        {
          id: 'g1',
          question: "Qu'est-ce que LearnHub ?",
          answer:
            'LearnHub est une plateforme de formations en ligne en développement, design et data, avec des projets pratiques et un suivi de progression.',
          isOpen: true,
          helpful: { yes: 42, no: 3 },
        },
        {
          id: 'g2',
          question: 'Comment créer un compte ?',
          answer:
            'Cliquez sur « Commencer gratuitement », renseignez votre email et choisissez un mot de passe. Vous accédez ensuite à votre espace personnel.',
          isOpen: false,
          helpful: { yes: 89, no: 7 },
        },
        {
          id: 'g3',
          question: 'Puis-je suivre les cours sur mobile ?',
          answer:
            'Oui, la plateforme est entièrement responsive : smartphone, tablette et ordinateur.',
          isOpen: false,
          helpful: { yes: 28, no: 2 },
        },
      ],
    },
    {
      id: 'billing',
      name: 'Paiement',
      items: [
        {
          id: 'b1',
          question: 'Quels moyens de paiement acceptez-vous ?',
          answer:
            'Carte bancaire et Mobile Money. Vous pouvez aussi appliquer un code promo avant de valider votre commande.',
          isOpen: false,
          helpful: { yes: 56, no: 4 },
        },
        {
          id: 'b2',
          question: 'Puis-je être remboursé ?',
          answer:
            'Oui, sous 14 jours si vous avez suivi moins de 20 % du cours. Contactez le support avec votre numéro de commande.',
          isOpen: false,
          helpful: { yes: 71, no: 8 },
        },
      ],
    },
    {
      id: 'security',
      name: 'Certificats',
      items: [
        {
          id: 's1',
          question: 'Obtient-on un certificat ?',
          answer:
            'Oui, un certificat de réussite est délivré à la fin de chaque formation et téléchargeable depuis votre espace.',
          isOpen: false,
          helpful: { yes: 98, no: 2 },
        },
        {
          id: 's2',
          question: 'Mes données sont-elles protégées ?',
          answer: 'Vos données sont chiffrées et ne sont jamais revendues à des tiers.',
          isOpen: false,
          helpful: { yes: 67, no: 3 },
        },
      ],
    },
    {
      id: 'support',
      name: 'Support',
      items: [
        {
          id: 'sp1',
          question: 'Comment contacter le support ?',
          answer: 'Par le formulaire de contact ou par email. Nous répondons sous 24 h ouvrées.',
          isOpen: false,
          helpful: { yes: 112, no: 9 },
        },
        {
          id: 'sp2',
          question: "J'ai un souci technique avec une vidéo",
          answer:
            'Actualisez la page, puis essayez un autre navigateur. Si le problème persiste, contactez-nous avec une capture d’écran.',
          isOpen: false,
          helpful: { yes: 45, no: 6 },
        },
      ],
    },
  ];

  toggleItem(item: FaqItem): void {
    item.isOpen = !item.isOpen;
  }

  selectCategory(id: string): void {
    this.activeCategory = id;
  }

  getFilteredCategories(): FaqCategory[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.categories;
    return this.categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }

  getActiveCategory(): FaqCategory | undefined {
    return this.categories.find((c) => c.id === this.activeCategory);
  }

  getTotalQuestions(): number {
    return this.categories.reduce((t, c) => t + c.items.length, 0);
  }

  getSearchResultsCount(): number {
    return this.getFilteredCategories().reduce((t, c) => t + c.items.length, 0);
  }

  markHelpful(item: FaqItem, isHelpful: boolean): void {
    if (!item.helpful) item.helpful = { yes: 0, no: 0 };
    if (isHelpful) item.helpful.yes++;
    else item.helpful.no++;
  }

  expandAll(): void {
    this.categories.forEach((c) => c.items.forEach((i) => (i.isOpen = true)));
  }

  collapseAll(): void {
    this.categories.forEach((c) => c.items.forEach((i) => (i.isOpen = false)));
  }
}

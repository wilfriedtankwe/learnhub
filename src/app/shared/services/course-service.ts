import { computed, Service, signal } from '@angular/core';
import { Course } from '../models/course.model';

export interface AppliedCoupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxDiscount?: number;
  description: string;
}

export interface Order {
  id: string;
  items: Course[];
  total: number;
  email: string;
}

@Service()
export class CourseService {
  readonly courses = signal<Course[]>([
    { id: 1, title: 'Angular de zéro à pro', category: 'Développement', level: 'Intermédiaire', price: 49, rating: 4.8, hours: 22, instructor: 'A. Nkou', description: 'Composants, signals, routing et déploiement.', progress: 64 },
    { id: 2, title: 'UI Design avec Figma', category: 'Design', level: 'Débutant', price: 39, rating: 4.6, hours: 12, instructor: 'M. Tchoua', description: 'Créez des interfaces cohérentes et modernes.', progress: 30 },
    { id: 3, title: 'Python pour la Data', category: 'Data', level: 'Débutant', price: 45, rating: 4.7, hours: 18, instructor: 'S. Fotso', description: 'Pandas, visualisation et analyse de données.' },
    { id: 4, title: 'Marketing digital', category: 'Marketing', level: 'Intermédiaire', price: 35, rating: 4.4, hours: 10, instructor: 'L. Kamga', description: 'SEO, réseaux sociaux et publicité en ligne.' },
    { id: 5, title: 'TypeScript avancé', category: 'Développement', level: 'Avancé', price: 55, rating: 4.9, hours: 15, instructor: 'A. Nkou', description: 'Génériques, types utilitaires et patterns.' },
    { id: 6, title: 'Tailwind CSS en pratique', category: 'Design', level: 'Intermédiaire', price: 29, rating: 4.7, hours: 8, instructor: 'M. Tchoua', description: 'Responsive et design systems avec Tailwind.' },
  ]);

  // ----- Filtres -----
  readonly search = signal('');
  readonly category = signal<string>('Tous');

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const cat = this.category();
    return this.courses().filter(
      (c) => (cat === 'Tous' || c.category === cat) && c.title.toLowerCase().includes(q),
    );
  });

  // ----- Panier -----
  readonly cart = signal<Course[]>([]);
  readonly cartTotal = computed(() => this.cart().reduce((s, c) => s + c.price, 0));

  addToCart(course: Course): void {
    if (!this.cart().some((c) => c.id === course.id)) {
      this.cart.update((list) => [...list, course]);
    }
  }

  removeFromCart(id: number): void {
    this.cart.update((list) => list.filter((c) => c.id !== id));
    if (this.cart().length === 0) this.appliedCoupon.set(null);
  }

  // ----- Coupon -----
  readonly appliedCoupon = signal<AppliedCoupon | null>(null);

  readonly discount = computed(() => {
    const c = this.appliedCoupon();
    const total = this.cartTotal();
    if (!c) return 0;
    const raw = c.type === 'percentage' ? (total * c.value) / 100 : c.value;
    const capped = Math.min(raw, c.maxDiscount ?? Infinity, total);
    return Math.round(capped * 100) / 100;
  });

  readonly totalToPay = computed(() => this.cartTotal() - this.discount());

  // ----- Commande -----
  readonly lastOrder = signal<Order | null>(null);

  checkout(email: string): void {
    this.lastOrder.set({
      id: 'LH-' + Math.floor(100000 + Math.random() * 900000),
      items: this.cart(),
      total: this.totalToPay(),
      email,
    });
    this.cart.set([]);
    this.appliedCoupon.set(null);
  }
}

import { Component, inject, output, signal } from '@angular/core';
import { CourseService } from '../../../shared/services/course-service';

type CouponType = 'percentage' | 'fixed';

interface CouponItem {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  description: string;
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt: Date;
  isActive: boolean;
}

// Dates relatives : les coupons ne sont jamais expirés pendant la démo
const inDays = (n: number): Date => new Date(Date.now() + n * 86_400_000);


@Component({
  imports: [],
  standalone: true,
  selector: 'app-coupon',
  styleUrl: './coupon.css',
  templateUrl: './coupon.html',
})
export class Coupon {
  protected readonly service = inject(CourseService);

  /** Émis quand l'utilisateur clique sur « Passer au paiement » */
  readonly checkout = output<void>();

  protected readonly applied = this.service.appliedCoupon;
  protected readonly subtotal = this.service.cartTotal;
  protected readonly discount = this.service.discount;
  protected readonly total = this.service.totalToPay;

  protected readonly couponInput = signal('');
  protected readonly isApplying = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');

  protected readonly availableCoupons: CouponItem[] = [
    {
      id: '1',
      code: 'LEARN10',
      type: 'percentage',
      value: 10,
      description: '10 % de réduction sur toute la commande',
      expiresAt: inDays(60),
      isActive: true,
    },
    {
      id: '2',
      code: 'ANGULAR20',
      type: 'percentage',
      value: 20,
      description: '20 % de réduction dès 80 € d’achat',
      minPurchase: 80,
      maxDiscount: 50,
      expiresAt: inDays(30),
      isActive: true,
    },
    {
      id: '3',
      code: 'FLAT15',
      type: 'fixed',
      value: 15,
      description: '15 € offerts dès 60 € d’achat',
      minPurchase: 60,
      expiresAt: inDays(5),
      isActive: true,
    },
    {
      id: '4',
      code: 'BIENVENUE',
      type: 'percentage',
      value: 15,
      description: 'Offre de bienvenue (déjà utilisée)',
      expiresAt: inDays(90),
      isActive: false,
    },
  ];

  protected money(n: number): string {
    return n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  }

  protected daysLeft(date: Date): number {
    return Math.ceil((new Date(date).getTime() - Date.now()) / 86_400_000);
  }

  protected isExpiringSoon(date: Date): boolean {
    return this.daysLeft(date) <= 7;
  }

  protected isEligible(c: CouponItem): boolean {
    if (!c.isActive || this.daysLeft(c.expiresAt) <= 0) return false;
    if (c.minPurchase && this.subtotal() < c.minPurchase) return false;
    return true;
  }

  protected applyCoupon(): void {
    const code = this.couponInput().trim();
    if (!code) {
      this.errorMessage.set('Saisissez un code promo');
      return;
    }
    this.isApplying.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    setTimeout(() => {
      const coupon = this.availableCoupons.find((c) => c.code.toLowerCase() === code.toLowerCase());
      if (!coupon || !coupon.isActive || this.daysLeft(coupon.expiresAt) <= 0) {
        this.errorMessage.set('Code invalide ou expiré');
      } else if (coupon.minPurchase && this.subtotal() < coupon.minPurchase) {
        this.errorMessage.set(`Achat minimum de ${this.money(coupon.minPurchase)} requis`);
      } else {
        this.apply(coupon);
        this.couponInput.set('');
      }
      this.isApplying.set(false);
    }, 600);
  }

  protected selectCoupon(coupon: CouponItem): void {
    if (!this.isEligible(coupon)) return;
    this.apply(coupon);
    this.errorMessage.set('');
  }

  private apply(c: CouponItem): void {
    this.service.appliedCoupon.set({
      id: c.id,
      code: c.code,
      type: c.type,
      value: c.value,
      maxDiscount: c.maxDiscount,
      description: c.description,
    });
    this.successMessage.set(`Code « ${c.code} » appliqué !`);
  }

  protected removeCoupon(): void {
    this.service.appliedCoupon.set(null);
    this.successMessage.set('');
  }

  protected copyCouponCode(code: string): void {
    navigator.clipboard?.writeText(code);
    this.successMessage.set(`Code « ${code} » copié !`);
    setTimeout(() => {
      if (this.successMessage().includes('copié')) this.successMessage.set('');
    }, 2000);
  }
}

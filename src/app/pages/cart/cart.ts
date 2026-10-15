import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../../shared/services/course-service';
import { Confirmation } from '../confirmation/confirmation';
import { ConfirmationInline } from '../../libraryui/components/confirmation-inline/confirmation-inline';
import { Coupon } from '../../libraryui/components/coupon/coupon';

@Component({
  imports: [RouterLink, ConfirmationInline, Coupon],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  protected readonly service = inject(CourseService);
  private readonly router = inject(Router);

  protected readonly email = signal('');
  protected readonly emailError = signal(false);
  protected readonly pendingRemove = signal<number | null>(null);
  protected readonly confirmingCheckout = signal(false);

  protected remove(id: number): void {
    this.service.removeFromCart(id);
    this.pendingRemove.set(null);
  }

  protected askCheckout(): void {
    const valid = /^\S+@\S+\.\S+$/.test(this.email());
    this.emailError.set(!valid);
    this.confirmingCheckout.set(valid);
  }

  protected pay(): void {
    this.service.checkout(this.email());
    this.confirmingCheckout.set(false);
    this.router.navigateByUrl('/confirmation');
  }
}

import { Component, computed, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-confirmation-inline',
  styleUrl: './confirmation-inline.css',
  templateUrl: './confirmation-inline.html',
})
export class ConfirmationInline {
  readonly variant = input<'danger' | 'warning'>('danger');
  readonly message = input.required<string>();
  readonly cancelLabel = input('Annuler');
  readonly confirmLabel = input('Confirmer');

  readonly cancelled = output<void>();
  readonly confirmed = output<void>();

  protected readonly styles = computed(() =>
    this.variant() === 'danger'
      ? { box: 'bg-gray-50 border-gray-200', confirm: 'bg-red-500 hover:bg-red-600' }
      : { box: 'bg-amber-50 border-amber-200', confirm: 'bg-amber-400 hover:bg-amber-500' },
  );
}

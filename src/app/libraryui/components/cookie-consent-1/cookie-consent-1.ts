import { Component, signal } from '@angular/core';

const KEY = 'learnhub-cookie-consent';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-cookie-consent-1',
  styleUrl: './cookie-consent-1.css',
  templateUrl: './cookie-consent-1.html',
})
export class CookieConsent1 {
  protected readonly visible = signal(!CookieConsent1.read());

  protected acceptAll(): void {
    this.save('accepted');
  }

  protected decline(): void {
    this.save('declined');
  }

  private save(value: string): void {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* stockage indisponible */
    }
    this.visible.set(false);
  }

  private static read(): string | null {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }
}

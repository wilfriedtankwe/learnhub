import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './core/layout/layout';
import { CookieConsent1 } from './libraryui/components/cookie-consent-1/cookie-consent-1';

@Component({
  imports: [RouterOutlet, CookieConsent1],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('learnhub');
}

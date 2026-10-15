import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../../shared/services/course-service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
  standalone: true,
})
export class Layout {
  protected readonly cart = inject(CourseService).cart;
  protected readonly menuOpen = signal(false);

  protected readonly links = [
    { label: 'Accueil', path: '/', exact: true },
    { label: 'Catalogue', path: '/catalogue', exact: false },
    { label: 'Mon espace', path: '/dashboard', exact: false },
  ];
}

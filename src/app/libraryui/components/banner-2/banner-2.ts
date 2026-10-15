import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-banner-2',
  styleUrl: './banner-2.css',
  templateUrl: './banner-2.html',
})
export class Banner2 {
  badge = '🚀 Nouvelles formations chaque semaine';
  stats = [
    { v: '50K+', l: 'Apprenants' },
    { v: '120+', l: 'Formations' },
    { v: '4,8/5', l: 'Note moyenne' },
  ];
}

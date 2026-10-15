import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Cluster {
  id: number;
  name: string; // titre de la formation
  handle: string; // formateur
  image: string;
  avatar: string;
  verified: boolean; // best-seller
  price: number;
}
type Position = 'prev' | 'active' | 'next';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-cluster-carousel',
  styleUrl: './cluster-carousel.css',
  templateUrl: './cluster-carousel.html',
})
export class ClusterCarousel {
  activeIndex = 1;
  isAnimating = false;
  private touchStartX = 0;
  private touchStartY = 0;

  clusters: Cluster[] = [
    {
      id: 1,
      name: 'Angular de zéro à pro',
      handle: 'A. Nkou',
      verified: true,
      price: 49,
      image: 'https://picsum.photos/seed/angular-course/600/380',
      avatar: 'https://i.pravatar.cc/120?u=nkou',
    },
    {
      id: 2,
      name: 'UI Design avec Figma',
      handle: 'M. Tchoua',
      verified: false,
      price: 39,
      image: 'https://picsum.photos/seed/figma-course/600/380',
      avatar: 'https://i.pravatar.cc/120?u=tchoua',
    },
    {
      id: 3,
      name: 'Python pour la Data',
      handle: 'S. Fotso',
      verified: true,
      price: 45,
      image: 'https://picsum.photos/seed/python-course/600/380',
      avatar: 'https://i.pravatar.cc/120?u=fotso',
    },
    {
      id: 4,
      name: 'TypeScript avancé',
      handle: 'A. Nkou',
      verified: true,
      price: 55,
      image: 'https://picsum.photos/seed/ts-course/600/380',
      avatar: 'https://i.pravatar.cc/120?u=nkou2',
    },
    {
      id: 5,
      name: 'Tailwind CSS en pratique',
      handle: 'M. Tchoua',
      verified: false,
      price: 29,
      image: 'https://picsum.photos/seed/tailwind-course/600/380',
      avatar: 'https://i.pravatar.cc/120?u=tchoua2',
    },
  ];

  get prevIndex(): number {
    return (this.activeIndex - 1 + this.clusters.length) % this.clusters.length;
  }

  get nextIndex(): number {
    return (this.activeIndex + 1) % this.clusters.length;
  }

  getVisibleCards(): { cluster: Cluster; position: Position }[] {
    return [
      { cluster: this.clusters[this.prevIndex], position: 'prev' },
      { cluster: this.clusters[this.activeIndex], position: 'active' },
      { cluster: this.clusters[this.nextIndex], position: 'next' },
    ];
  }

  prev(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.activeIndex = this.prevIndex;
    setTimeout(() => (this.isAnimating = false), 400);
  }

  next(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.activeIndex = this.nextIndex;
    setTimeout(() => (this.isAnimating = false), 400);
  }

  // Clic sur une carte latérale : elle passe au centre
  onCardClick(position: Position): void {
    if (position === 'prev') this.prev();
    else if (position === 'next') this.next();
  }

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  }

  onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    const dy = e.changedTouches[0].clientY - this.touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) this.next();
      else this.prev();
    }
  }
}

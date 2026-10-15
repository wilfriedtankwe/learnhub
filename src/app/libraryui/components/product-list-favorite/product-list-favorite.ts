import { Component, computed, inject, signal } from '@angular/core';
import { Course } from '../../../shared/models/course.model';
import { CourseService } from '../../../shared/services/course-service';
import { CommonModule } from '@angular/common';

interface CourseProduct {
  id: number;
  name: string;
  description: string;
  imageSeed: string;
  rating: number;
  price: number;
  mrp: number;
  isFavorite: boolean;
  course: Course;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-product-list-favorite',
  styleUrl: './product-list-favorite.css',
  templateUrl: './product-list-favorite.html',
  host: { class: 'block bg-white' },
})
export class ProductListFavorite {
  private readonly courseService = inject(CourseService);
  private readonly favoriteIds = signal<ReadonlySet<number>>(new Set());

  protected readonly stars = [0, 1, 2, 3, 4];

  protected readonly products = computed<CourseProduct[]>(() =>
    this.courseService.filtered().map((c) => ({
      id: c.id,
      name: c.title,
      description: c.description,
      imageSeed: c.title,
      rating: Math.round(c.rating),
      price: c.price,
      mrp: Math.round(c.price * 1.4), // prix « barré »
      isFavorite: this.favoriteIds().has(c.id),
      course: c,
    })),
  );

  protected imageUrl(product: CourseProduct): string {
    return `https://picsum.photos/seed/${encodeURIComponent(product.imageSeed)}/640/360`;
  }

  protected onAddToCart(product: CourseProduct): void {
    this.courseService.addToCart(product.course);
  }

  protected onToggleFavorite(product: CourseProduct): void {
    this.favoriteIds.update((ids) => {
      const next = new Set(ids);
      if (next.has(product.id)) next.delete(product.id);
      else next.add(product.id);
      return next;
    });
  }
}

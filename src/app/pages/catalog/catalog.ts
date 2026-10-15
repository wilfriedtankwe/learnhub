import { Component, inject } from '@angular/core';
import { CourseService } from '../../shared/services/course-service';
import { ProductListFavorite } from '../../libraryui/components/product-list-favorite/product-list-favorite';

@Component({
  imports: [ProductListFavorite],
  selector: 'app-catalog',
  styleUrl: './catalog.css',
  templateUrl: './catalog.html',
})
export class Catalog {
  protected readonly service = inject(CourseService);
  protected readonly categories = ['Tous', 'Développement', 'Design', 'Data', 'Marketing'];
}

import { Component, inject } from '@angular/core';
import { CourseService } from '../../shared/services/course-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-confirmation',
  styleUrl: './confirmation.css',
  templateUrl: './confirmation.html',
  standalone:true,
})
export class Confirmation {
  protected readonly order = inject(CourseService).lastOrder;

  constructor() {
    if (!this.order()) inject(Router).navigateByUrl('/catalogue');
  }
}

import { Component } from '@angular/core';
import { Banner2 } from '../../libraryui/components/banner-2/banner-2';
import { CallToAction1 } from '../../libraryui/components/call-to-action-1/call-to-action-1';
import { ClusterCarousel } from '../../libraryui/cluster-carousel/cluster-carousel/cluster-carousel';
import { TestimonyPersonComponent } from '../../libraryui/components/testimony-person/testimony-person';
import { FaqAccordionPage } from '../../libraryui/components/faq-accordion/faq-accordion';

@Component({
  standalone: true,
  imports: [Banner2, CallToAction1, ClusterCarousel, TestimonyPersonComponent, FaqAccordionPage],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}

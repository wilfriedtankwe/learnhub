import { Component, signal } from '@angular/core';

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  quote: string;
  avatarSeed: string;
}

@Component({
  imports: [],
  selector: 'app-testimony-person',
  styleUrl: './testimony-person.css',
  templateUrl: './testimony-person.html',
  host: {
    class: 'block bg-white',
  },
  standalone: true,
})
export class TestimonyPersonComponent {
  protected readonly stars = [0, 1, 2, 3, 4];

  protected readonly heading = signal("Ce qu'en disent nos apprenants");
  protected readonly subheading = signal(
    'Des milliers de personnes ont déjà changé de métier ou monté en compétences grâce à nos formations.',
  );

  protected readonly testimonials = signal<Testimonial[]>([
    {
      id: 'aicha',
      name: 'Aïcha Mbarga',
      rating: 5,
      quote:
        "Grâce à la formation Angular, j'ai décroché mon premier poste de développeuse en 4 mois. Les projets sont concrets.",
      avatarSeed: 'aicha-mbarga',
    },
    {
      id: 'brice',
      name: 'Brice Tchinda',
      rating: 4,
      quote:
        "Les cours sont clairs et le tableau de bord m'aide à suivre ma progression sans me perdre.",
      avatarSeed: 'brice-tchinda',
    },
    {
      id: 'nadine',
      name: 'Nadine Fouda',
      rating: 5,
      quote:
        "Le cours de design m'a donné les bases pour créer mes propres maquettes. Je recommande à 100 %.",
      avatarSeed: 'nadine-fouda',
    },
  ]);

  protected avatarUrl(testimonial: Testimonial): string {
    return `https://i.pravatar.cc/160?u=${testimonial.avatarSeed}`;
  }
}

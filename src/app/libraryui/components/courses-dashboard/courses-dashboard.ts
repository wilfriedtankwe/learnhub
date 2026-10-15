import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

interface Course {
  id: number;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  image: string;
  category: string;
  progress: number; // 0 à 100
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumb: string;
}

interface NavItem {
  icon: string;
  label: string;
  active: boolean;
  link?: string;
}

type Tab = 'all' | 'active' | 'completed';


@Component({
  imports: [],
  standalone: true,
  selector: 'app-courses-dashboard',
  styleUrl: './courses-dashboard.css',
  templateUrl: './courses-dashboard.html',
})
export class CoursesDashboard {
  private readonly router = inject(Router);

  // ----- État de l'interface -----
  protected readonly sidebarOpen = signal(false);
  protected readonly activeTab = signal<Tab>('all');
  protected readonly activeCategory = signal('Tous');
  protected readonly searchOpen = signal(false);
  protected readonly query = signal('');

  protected readonly tabs: Tab[] = ['all', 'active', 'completed'];
  protected readonly tabLabels: Record<Tab, string> = {
    all: 'Tous',
    active: 'En cours',
    completed: 'Terminés',
  };

  protected readonly categories = ['Tous', 'Développement', 'Design', 'Data'];
  protected readonly categoryIcons: Record<string, string> = {
    Tous: '📚',
    Développement: '💻',
    Design: '🎨',
    Data: '📊',
  };

  protected readonly stars = [0, 1, 2, 3, 4];

  protected readonly navItems: NavItem[] = [
    { icon: 'grid', label: 'Accueil', active: false, link: '/' },
    { icon: 'book-open', label: 'Cours', active: true },
    { icon: 'calendar', label: 'Planning', active: false },
    { icon: 'layers', label: 'Ressources', active: false },
    { icon: 'award', label: 'Certificats', active: false },
    { icon: 'message-circle', label: 'Messages', active: false },
    { icon: 'settings', label: 'Réglages', active: false },
  ];

  // ----- Données -----
  protected readonly courses: Course[] = [
    {
      id: 1,
      title: 'Angular de zéro à pro',
      description:
        'Composants, signals, routing et déploiement : construisez une application complète pas à pas.',
      rating: 5,
      reviews: 310,
      duration: '22h',
      level: 'Intermédiaire',
      category: 'Développement',
      progress: 64,
      image: 'https://picsum.photos/seed/angular/120/80',
    },
    {
      id: 2,
      title: 'UI Design avec Figma',
      description: 'Créez des interfaces cohérentes, du wireframe au prototype interactif.',
      rating: 4,
      reviews: 245,
      duration: '12h',
      level: 'Débutant',
      category: 'Design',
      progress: 30,
      image: 'https://picsum.photos/seed/figma/120/80',
    },
    {
      id: 3,
      title: 'Python pour la Data',
      description: 'Pandas, visualisation et analyse de données sur des cas réels.',
      rating: 5,
      reviews: 198,
      duration: '18h',
      level: 'Débutant',
      category: 'Data',
      progress: 100,
      image: 'https://picsum.photos/seed/python/120/80',
    },
    {
      id: 4,
      title: 'TypeScript avancé',
      description: 'Génériques, types utilitaires et patterns pour un code robuste.',
      rating: 5,
      reviews: 131,
      duration: '15h',
      level: 'Avancé',
      category: 'Développement',
      progress: 12,
      image: 'https://picsum.photos/seed/typescript/120/80',
    },
    {
      id: 5,
      title: 'Tailwind CSS en pratique',
      description: 'Responsive, thèmes et design system avec Tailwind CSS.',
      rating: 4,
      reviews: 98,
      duration: '8h',
      level: 'Intermédiaire',
      category: 'Design',
      progress: 100,
      image: 'https://picsum.photos/seed/tailwind/120/80',
    },
    {
      id: 6,
      title: 'SQL et bases de données',
      description: 'Requêtes, jointures et modélisation pour analyser vos données.',
      rating: 4,
      reviews: 207,
      duration: '10h',
      level: 'Débutant',
      category: 'Data',
      progress: 0,
      image: 'https://picsum.photos/seed/sql/120/80',
    },
  ];

  protected readonly lessons: Lesson[] = [
    {
      id: 1,
      title: 'Introduction',
      description: 'Découvrez le programme et les objectifs de la formation.',
      duration: '0:59',
      thumb: 'https://picsum.photos/seed/lesson1/80/60',
    },
    {
      id: 2,
      title: 'Mise en route',
      description: 'Installez votre environnement et lancez votre premier projet.',
      duration: '12:45',
      thumb: 'https://picsum.photos/seed/lesson2/80/60',
    },
    {
      id: 3,
      title: 'Les fondamentaux',
      description: 'Les concepts clés expliqués pas à pas, avec des exemples.',
      duration: '18:30',
      thumb: 'https://picsum.photos/seed/lesson3/80/60',
    },
  ];

  protected readonly instructor = {
    name: 'A. Nkou',
    title: 'Formateur Angular & TypeScript',
    avatar: 'https://i.pravatar.cc/80?u=nkou',
  };

  protected readonly heroImage = 'https://picsum.photos/seed/dashboard-hero/800/450';

  protected readonly selected = signal<Course>(this.courses[0]);

  protected readonly filteredCourses = computed(() => {
    const q = this.query().trim().toLowerCase();
    const cat = this.activeCategory();
    const tab = this.activeTab();
    return this.courses.filter(
      (c) =>
        (cat === 'Tous' || c.category === cat) &&
        (tab === 'all' || (tab === 'active' ? c.progress < 100 : c.progress === 100)) &&
        (!q || c.title.toLowerCase().includes(q)),
    );
  });

  // ----- Actions -----
  protected toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  protected toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    if (!this.searchOpen()) this.query.set('');
  }

  protected go(item: NavItem): void {
    if (item.link) this.router.navigateByUrl(item.link);
    this.sidebarOpen.set(false);
  }

  protected goHome(): void {
    this.router.navigateByUrl('/');
  }
}

import { Component, signal } from '@angular/core';

interface Course {
  id: number;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  image: string;
  language: string; // catégorie
  progress: number;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumb: string;
}

type Tab = 'all' | 'active' | 'completed';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-courses-dashboard-page',
  styleUrl: './courses-dashboard-page.css',
  templateUrl: './courses-dashboard-page.html',
})
export class CoursesDashboardPage {
  sidebarOpen = signal(false);
  activeTab = signal<Tab>('all');
  activeLanguage = signal('Tous');

  languages = ['Tous', 'Développement', 'Design', 'Data'];
  tabs: Tab[] = ['all', 'active', 'completed'];
  tabLabels: Record<string, string> = { all: 'Tous', active: 'En cours', completed: 'Terminés' };
  languageFlags: Record<string, string> = {
    Tous: '📚',
    Développement: '💻',
    Design: '🎨',
    Data: '📊',
  };

  navItems = [
    { icon: 'grid', label: 'Accueil', active: false },
    { icon: 'book-open', label: 'Cours', active: true },
    { icon: 'calendar', label: 'Planning', active: false },
    { icon: 'layers', label: 'Ressources', active: false },
    { icon: 'award', label: 'Certificats', active: false },
    { icon: 'message-circle', label: 'Messages', active: false },
    { icon: 'settings', label: 'Réglages', active: false },
  ];

  courses: Course[] = [
    {
      id: 1,
      title: 'Angular de zéro à pro',
      description:
        'Composants, signals, routing et déploiement : construisez une application complète.',
      rating: 5,
      reviews: 310,
      duration: '22h',
      level: 'Intermédiaire',
      language: 'Développement',
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
      language: 'Design',
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
      language: 'Data',
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
      language: 'Développement',
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
      language: 'Design',
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
      language: 'Data',
      progress: 0,
      image: 'https://picsum.photos/seed/sql/120/80',
    },
  ];

  selectedCourse: Course = this.courses[0];

  lessons: Lesson[] = [
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
      description: 'Les concepts clés expliqués pas à pas, avec exemples.',
      duration: '18:30',
      thumb: 'https://picsum.photos/seed/lesson3/80/60',
    },
  ];

  instructor = {
    name: 'A. Nkou',
    title: 'Formateur Angular & TypeScript',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
  };

  heroImage = 'https://picsum.photos/seed/dashboard-hero/800/450';

  get filteredCourses(): Course[] {
    return this.courses.filter(
      (c) =>
        (this.activeLanguage() === 'Tous' || c.language === this.activeLanguage()) &&
        (this.activeTab() === 'all' ||
          (this.activeTab() === 'active' ? c.progress < 100 : c.progress === 100)),
    );
  }

  stars(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  selectCourse(course: Course) {
    this.selectedCourse = course;
  }
  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }
  setTab(tab: Tab) {
    this.activeTab.set(tab);
  }
  setLanguage(lang: string) {
    this.activeLanguage.set(lang);
  }
}

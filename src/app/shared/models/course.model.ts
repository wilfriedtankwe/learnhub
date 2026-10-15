export interface Course {
  id: number;
  title: string;
  category: 'Développement' | 'Design' | 'Data' | 'Marketing';
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  price: number;
  rating: number;
  hours: number;
  instructor: string;
  description: string;
  progress?: number;
}

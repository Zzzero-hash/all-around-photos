export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
}

export const TESTIMONIAL_ROTATION_INTERVAL = 6000; // 6 seconds
export const MAX_RATING = 5;

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Property Manager',
    company: 'Metro Commercial Properties',
    image: '/testimonials/sarah-johnson.jpg',
    rating: 5,
    text: 'All Around Photos provided exceptional drone inspection services for our commercial building. Their detailed reports and high-quality imagery helped us identify maintenance issues we never would have spotted otherwise. Highly professional and reliable.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Real Estate Agent',
    company: 'Premier Realty Group',
    image: '/testimonials/michael-chen.jpg',
    rating: 5,
    text: 'The aerial photography for our luxury listings has been a game-changer. The stunning perspectives and professional quality have significantly increased client interest and helped properties sell faster. Outstanding work!',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Event Coordinator',
    company: 'Elegant Events LLC',
    image: '/testimonials/emily-rodriguez.jpg',
    rating: 5,
    text: 'Our wedding clients absolutely love the aerial footage and photography. The team is professional, unobtrusive, and delivers breathtaking results. They capture moments and perspectives that traditional photography simply cannot.',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Construction Manager',
    company: 'BuildRight Construction',
    image: '/testimonials/david-thompson.jpg',
    rating: 5,
    text: 'Regular progress documentation with drone photography has improved our project management significantly. The detailed aerial views help us track progress, identify potential issues, and communicate effectively with stakeholders.',
  },
  {
    id: 5,
    name: 'Lisa Park',
    role: 'Homeowner',
    company: '',
    image: '/testimonials/lisa-park.jpg',
    rating: 5,
    text: 'The roof inspection service was thorough and professional. The detailed report with high-resolution images helped us understand exactly what repairs were needed. Great value and peace of mind for homeowners.',
  },
];
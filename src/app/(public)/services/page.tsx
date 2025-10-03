import { Metadata } from 'next';
import { ServiceCard } from '@/components/services/ServiceCard';

export const metadata: Metadata = {
  title: 'Services | All Around Photos LLC',
  description: 'Professional drone photography and inspection services including commercial inspections, residential photography, real estate services, and event coverage.',
};

const services = [
  {
    id: 'commercial-inspection',
    title: 'Commercial Inspections',
    description: 'Comprehensive aerial inspections for commercial properties with detailed reports and high-resolution imagery.',
    category: 'INSPECTION' as const,
    features: [
      'Roof inspections and damage assessment',
      'Building facade analysis',
      'Solar panel inspections',
      'Construction progress monitoring',
      'Insurance documentation',
    ],
    packages: [
      {
        name: 'Basic Inspection',
        duration: '2 hours',
        locations: 1,
        price: '$499',
        deliverables: '50+ high-resolution images, PDF report',
      },
      {
        name: 'Standard Inspection',
        duration: '4 hours',
        locations: 3,
        price: '$899',
        deliverables: '100+ high-resolution images, detailed PDF report, 3D model',
      },
      {
        name: 'Premium Inspection',
        duration: '8 hours',
        locations: 5,
        price: '$1,499',
        deliverables: 'Unlimited images, detailed reports, 3D models, thermal imaging, video documentation',
      },
    ],
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop&auto=format',
  },
  {
    id: 'residential-inspection',
    title: 'Residential Inspections',
    description: 'Professional residential property inspections with detailed documentation and analysis.',
    category: 'INSPECTION' as const,
    features: [
      'Roof condition assessment',
      'Gutter and siding inspection',
      'Foundation analysis',
      'Landscaping documentation',
      'Pre-purchase inspections',
    ],
    packages: [
      {
        name: 'Basic Home Inspection',
        duration: '1 hour',
        locations: 1,
        price: '$199',
        deliverables: '30+ high-resolution images, basic PDF report',
      },
      {
        name: 'Comprehensive Inspection',
        duration: '2 hours',
        locations: 1,
        price: '$349',
        deliverables: '60+ high-resolution images, detailed PDF report, thermal imaging',
      },
      {
        name: 'Complete Package',
        duration: '3 hours',
        locations: 1,
        price: '$549',
        deliverables: 'Unlimited images, detailed reports, thermal imaging, video documentation',
      },
    ],
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop&auto=format',
  },
  {
    id: 'real-estate-photography',
    title: 'Real Estate Photography',
    description: 'Stunning aerial photography to showcase properties and attract potential buyers.',
    category: 'PHOTOGRAPHY' as const,
    features: [
      'Property listing photography',
      'Aerial virtual tours',
      'Land and lot surveys',
      'Marketing materials',
      'Drone videography',
    ],
    packages: [
      {
        name: 'Listing Package',
        duration: '2 hours',
        locations: 1,
        price: '$299',
        deliverables: '20+ edited photos, virtual tour link',
      },
      {
        name: 'Premium Listing',
        duration: '3 hours',
        locations: 1,
        price: '$499',
        deliverables: '30+ edited photos, virtual tour, 2-minute video',
      },
      {
        name: 'Luxury Package',
        duration: '4 hours',
        locations: 1,
        price: '$699',
        deliverables: '40+ edited photos, virtual tour, 5-minute video, 360° views',
      },
    ],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&auto=format',
  },
  {
    id: 'event-photography',
    title: 'Event Photography',
    description: 'Unique aerial perspectives for weddings, corporate events, and special occasions.',
    category: 'PHOTOGRAPHY' as const,
    features: [
      'Wedding ceremony coverage',
      'Corporate event documentation',
      'Sports and recreational events',
      'Aerial videography',
      'Cinematography services',
    ],
    packages: [
      {
        name: 'Ceremony Coverage',
        duration: '2 hours',
        locations: 1,
        price: '$399',
        deliverables: '50+ edited photos, 30-second highlight video',
      },
      {
        name: 'Full Event Package',
        duration: '4 hours',
        locations: 1,
        price: '$699',
        deliverables: '100+ edited photos, 2-minute highlight video, raw footage',
      },
      {
        name: 'Complete Event',
        duration: '6 hours',
        locations: 1,
        price: '$999',
        deliverables: 'Unlimited edited photos, 5-minute video, raw footage, 360° views',
      },
    ],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop&auto=format',
  },
  {
    id: 'construction-documentation',
    title: 'Construction Documentation',
    description: 'Progress tracking and documentation for construction and development projects.',
    category: 'PHOTOGRAPHY' as const,
    features: [
      'Progress monitoring',
      'Site surveys',
      'Before/after comparisons',
      'Safety compliance',
      'Stakeholder reporting',
    ],
    packages: [
      {
        name: 'Monthly Progress',
        duration: '4 hours',
        locations: 1,
        price: '$599',
        deliverables: '20+ progress photos, monthly report',
      },
      {
        name: 'Bi-weekly Documentation',
        duration: '8 hours',
        locations: 1,
        price: '$1,099',
        deliverables: '40+ progress photos, detailed reports, time-lapse video',
      },
      {
        name: 'Full Project',
        duration: '16 hours',
        locations: 1,
        price: '$1,999',
        deliverables: 'Unlimited documentation, weekly reports, time-lapse compilation',
      },
    ],
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop&auto=format',
  },
  {
    id: 'specialized-services',
    title: 'Specialized Services',
    description: 'Customized drone photography solutions for unique requirements.',
    category: 'PHOTOGRAPHY' as const,
    features: [
      'Agricultural surveys',
      'Environmental monitoring',
      'Infrastructure inspections',
      'Custom flight patterns',
      'Specialized equipment',
    ],
    packages: [
      {
        name: 'Custom Survey',
        duration: '4 hours',
        locations: 1,
        price: '$499',
        deliverables: 'Custom deliverables based on requirements',
      },
      {
        name: 'Specialized Package',
        duration: '8 hours',
        locations: 1,
        price: '$899',
        deliverables: 'Advanced equipment usage, specialized reports',
      },
      {
        name: 'Enterprise Solution',
        duration: '12 hours',
        locations: 1,
        price: '$1,499',
        deliverables: 'Complete custom solution, ongoing support',
      },
    ],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&auto=format',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Our <span className="text-accent-500">Services</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Professional drone photography and inspection services tailored to meet your specific needs. 
            From commercial inspections to stunning real estate photography, we deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              category={service.category}
              features={service.features}
              packages={service.packages}
              image={service.image}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our FAA-certified pilots are ready to 
              capture the perfect aerial perspectives for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-20"
              >
                Get Free Quote
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-primary-600 text-primary-60 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

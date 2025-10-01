import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    id: 'commercial',
    title: 'Commercial Inspections',
    description: 'Professional drone inspections for commercial properties, roofing assessments, and infrastructure monitoring with detailed reporting.',
    features: [
      'Roof & Building Inspections',
      'Infrastructure Assessment',
      'Construction Progress',
      'Safety Compliance',
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    href: '/services/commercial',
    price: 'Starting at $299',
  },
  {
    id: 'residential',
    title: 'Residential Services',
    description: 'Home inspections, real estate photography, and property documentation to showcase residential properties effectively.',
    features: [
      'Home Inspections',
      'Real Estate Photography',
      'Property Documentation',
      'Listing Enhancement',
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    href: '/services/residential',
    price: 'Starting at $199',
  },
  {
    id: 'events',
    title: 'Event Photography',
    description: 'Aerial photography and cinematography for weddings, corporate events, and special occasions with cinematic quality.',
    features: [
      'Wedding Photography',
      'Corporate Events',
      'Aerial Cinematography',
      '4K Video Production',
    ],
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
    href: '/services/events',
    price: 'Starting at $499',
  },
];

export function ServiceOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            Our <span className="text-accent-500 font-accent">Services</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            From commercial property inspections to stunning event photography, 
            we deliver professional drone services tailored to your specific needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            >
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                    {service.price}
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary-900 mb-4 group-hover:text-accent-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-neutral-700">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={service.href}
                  className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-primary-900 mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Every project is unique. Let us create a tailored drone photography 
            package that meets your specific requirements and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Custom Quote
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
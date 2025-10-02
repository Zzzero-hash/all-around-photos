import Image from 'next/image';
import Link from 'next/link';
import { ServicePackage } from '@/types';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  category: 'PHOTOGRAPHY' | 'INSPECTION';
  features: string[];
  packages: ServicePackage[];
  image: string;
}

export function ServiceCard({
  id,
  title,
  description,
  category,
  features,
  packages,
  image,
}: ServiceCardProps) {
  const categoryColor = category === 'PHOTOGRAPHY' 
    ? 'bg-accent-500 text-white' 
    : 'bg-primary-600 text-white';

  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Service Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
            {category === 'PHOTOGRAPHY' ? 'Photography' : 'Property Inspection'}
          </span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-2">
            {title}
          </h3>
        </div>
      </div>

      {/* Service Content */}
      <div className="p-8">
        <p className="text-neutral-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-primary-900 mb-4">What's Included:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-neutral-700">
                <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Package Options */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-primary-900 mb-4">Session Packages:</h4>
          <div className="space-y-4">
            {packages.map((pkg, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg p-4 hover:border-accent-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-primary-800">{pkg.name}</h5>
                  <span className="text-xl font-bold text-accent-600">{pkg.price}</span>
                </div>
                <div className="text-sm text-neutral-600 space-y-1">
                  <p><strong>Duration:</strong> {pkg.duration}</p>
                  <p><strong>Locations:</strong> {pkg.locations}</p>
                  <p><strong>Deliverables:</strong> {pkg.deliverables}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/quote?service=${id}`}
            className="flex-1 text-center bg-accent-500 hover:bg-accent-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Get Quote
          </Link>
          <Link
            href={`/gallery?category=${id}`}
            className="flex-1 text-center bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
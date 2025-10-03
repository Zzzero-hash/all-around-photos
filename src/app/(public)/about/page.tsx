import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | All Around Photos LLC',
  description: 'Learn about All Around Photos LLC, your trusted partner for professional drone photography and inspection services.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-neutral-900 mb-8">
            About All Around Photos LLC
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Our Story</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                All Around Photos LLC was founded with a passion for capturing the world from unique perspectives. 
                Our team of FAA-certified drone pilots and professional photographers specialize in delivering 
                exceptional aerial photography and inspection services.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                With years of experience in commercial and residential photography, we understand the 
                importance of precision, safety, and quality in every project we undertake.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Our Mission</h2>
              <p className="text-neutral-600 leading-relaxed">
                To provide our clients with stunning aerial perspectives and comprehensive inspection 
                services that exceed expectations while maintaining the highest standards of safety 
                and professionalism.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Certifications & Standards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg text-neutral-800 mb-2">FAA Part 107 Certified</h3>
                  <p className="text-neutral-600">All our pilots hold current FAA Part 107 Remote Pilot Certificates</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg text-neutral-800 mb-2">Fully Insured</h3>
                  <p className="text-neutral-600">Comprehensive liability insurance for your peace of mind</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg text-neutral-800 mb-2">Professional Equipment</h3>
                  <p className="text-neutral-600">Industry-leading drones and photography equipment</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg text-neutral-800 mb-2">Quality Focused</h3>
                  <p className="text-neutral-600">Attention to detail and professional post-processing</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-80 mb-4">Why Choose Us</h2>
              <ul className="text-neutral-600 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>FAA-certified and fully licensed drone operators</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>High-resolution photography and videography capabilities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Customized solutions for commercial and residential needs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Fast turnaround times with professional results</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Competitive pricing with transparent quotes</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

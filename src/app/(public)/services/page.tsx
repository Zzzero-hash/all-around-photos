import { Metadata } from 'next';
import { ServiceCard } from '@/components/services/ServiceCard';
import { QuoteRequestSection } from '@/components/services/QuoteRequestSection';

export const metadata: Metadata = {
  title: 'Photography & Inspection Services | All Around Photos LLC',
  description: 'Professional drone photography, property inspections, portrait sessions, event photography, and aerial cinematography services. Unique perspectives from the sky and ground.',
  keywords: 'drone photography, property inspection, portrait photography, event photography, aerial photography, pet photography, commercial inspection, residential inspection',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional <span className="text-accent-400 font-accent">Photography</span> Services
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
              From aerial drone photography to intimate portrait sessions, we capture unique perspectives 
              that tell your story with professional quality and creative vision.
            </p>
          </div>
        </div>
      </section>

      {/* Photography Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Photography <span className="text-accent-500 font-accent">Services</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Capturing life's precious moments and professional needs with artistic vision and technical expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <ServiceCard
              id="portraits"
              title="Portrait Photography"
              description="Professional portrait sessions for families, couples, and individuals with personalized packages and multiple location options."
              category="PHOTOGRAPHY"
              features={[
                "Family Portrait Sessions (1-hour at one location)",
                "Extended Family Sessions (3-hour at two locations)", 
                "Couple & Individual Sessions (30 minutes to 1 hour)",
                "Professional lighting and posing guidance",
                "High-resolution edited images",
                "Online gallery for easy sharing"
              ]}
              packages={[
                {
                  name: "Family Essential",
                  duration: "1 hour",
                  locations: 1,
                  price: "$299",
                  deliverables: "20-30 edited high-resolution images"
                },
                {
                  name: "Family Premium", 
                  duration: "3 hours",
                  locations: 2,
                  price: "$599",
                  deliverables: "50-75 edited high-resolution images"
                },
                {
                  name: "Couple/Individual",
                  duration: "30 min - 1 hour", 
                  locations: 1,
                  price: "$199",
                  deliverables: "15-25 edited high-resolution images"
                }
              ]}
              image="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop"
            />

            <ServiceCard
              id="events"
              title="Event Photography"
              description="Comprehensive event coverage with unique aerial perspectives using professional drone technology for unforgettable moments."
              category="PHOTOGRAPHY"
              features={[
                "Birthday parties and celebrations",
                "Graduations and achievements",
                "Family reunions and gatherings",
                "Special occasions and milestones",
                "Aerial drone photography for unique perspectives",
                "Traditional ground-based photography"
              ]}
              packages={[
                {
                  name: "Event Essential",
                  duration: "2-4 hours",
                  locations: 1,
                  price: "$499",
                  deliverables: "100-150 edited images + aerial shots"
                },
                {
                  name: "Event Premium",
                  duration: "6-8 hours",
                  locations: 1,
                  price: "$899",
                  deliverables: "200-300 edited images + 4K video highlights"
                }
              ]}
              image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop"
            />

            <ServiceCard
              id="aerial"
              title="Aerial Photography Sessions"
              description="Stunning aerial photography showcasing panoramic views and unique perspectives impossible to capture from the ground."
              category="PHOTOGRAPHY"
              features={[
                "Panoramic landscape photography",
                "Property and real estate aerials",
                "Construction progress documentation",
                "Special event aerial coverage",
                "4K video capabilities",
                "Professional drone operation with FAA certification"
              ]}
              packages={[
                {
                  name: "Aerial Essential",
                  duration: "1-2 hours",
                  locations: 1,
                  price: "$399",
                  deliverables: "25-40 aerial images + basic editing"
                },
                {
                  name: "Aerial Premium",
                  duration: "3-4 hours",
                  locations: 2,
                  price: "$699",
                  deliverables: "50-75 aerial images + 4K video footage"
                }
              ]}
              image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
            />

            <ServiceCard
              id="pets"
              title="Pet Photography"
              description="Specialized pet photography sessions in a comfortable, pet-friendly environment with experience handling various animals."
              category="PHOTOGRAPHY"
              features={[
                "Dogs, cats, and small pets",
                "Farm animals (horses, goats, chickens)",
                "Exotic pets (reptiles, birds)",
                "Pet-friendly atmosphere and patience",
                "Action shots and posed portraits",
                "Indoor and outdoor session options"
              ]}
              packages={[
                {
                  name: "Pet Portrait",
                  duration: "1 hour",
                  locations: 1,
                  price: "$249",
                  deliverables: "15-25 edited pet portraits"
                },
                {
                  name: "Pet & Family",
                  duration: "1.5 hours",
                  locations: 1,
                  price: "$349",
                  deliverables: "25-35 images including family with pets"
                }
              ]}
              image="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Property Inspection Services */}
      <section className="py-20 bg-gradient-to-r from-neutral-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Property <span className="text-accent-500 font-accent">Inspection</span> Services
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Professional drone inspections for commercial and residential properties with detailed reporting and documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ServiceCard
              id="commercial-inspection"
              title="Commercial Property Inspections"
              description="Comprehensive commercial property assessments using advanced drone technology for roof inspections, building assessments, and infrastructure monitoring."
              category="INSPECTION"
              features={[
                "Roof and building exterior inspections",
                "Infrastructure assessment and monitoring",
                "Construction progress documentation",
                "Safety compliance verification",
                "Detailed inspection reports with findings",
                "High-resolution documentation photography"
              ]}
              packages={[
                {
                  name: "Basic Commercial",
                  duration: "2-3 hours",
                  locations: 1,
                  price: "$499",
                  deliverables: "Inspection report + 50-75 documentation photos"
                },
                {
                  name: "Comprehensive Commercial",
                  duration: "4-6 hours",
                  locations: 1,
                  price: "$899",
                  deliverables: "Detailed report + 100+ photos + 4K video documentation"
                }
              ]}
              image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
            />

            <ServiceCard
              id="residential-inspection"
              title="Residential Property Inspections"
              description="Thorough residential property inspections and real estate photography to showcase properties and identify potential issues."
              category="INSPECTION"
              features={[
                "Home exterior and roof inspections",
                "Real estate photography for listings",
                "Property documentation and assessment",
                "Listing enhancement with aerial views",
                "Before/after renovation documentation",
                "Insurance claim documentation"
              ]}
              packages={[
                {
                  name: "Home Inspection",
                  duration: "1-2 hours",
                  locations: 1,
                  price: "$299",
                  deliverables: "Inspection report + 30-50 documentation photos"
                },
                {
                  name: "Real Estate Package",
                  duration: "2-3 hours",
                  locations: 1,
                  price: "$449",
                  deliverables: "Marketing photos + aerial shots + property documentation"
                }
              ]}
              image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <QuoteRequestSection />
    </div>
  );
}
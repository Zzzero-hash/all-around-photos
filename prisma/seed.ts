import { PrismaClient, ServiceCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Test database connection first
    await prisma.$connect();
    console.log('✅ Database connection established');

    // Create default services
    const services = [
    {
      name: 'Commercial Roof Inspection',
      description: 'Comprehensive drone inspection of commercial roofing systems, identifying potential issues, damage, and maintenance needs.',
      category: ServiceCategory.INSPECTION,
      basePrice: 299.99,
      features: [
        'High-resolution aerial photography',
        'Thermal imaging capabilities',
        'Detailed inspection report',
        'GPS-tagged damage locations',
        'Before/after comparison photos',
        'Professional recommendations'
      ]
    },
    {
      name: 'Residential Property Inspection',
      description: 'Detailed drone inspection for residential properties, perfect for home buyers, sellers, and insurance claims.',
      category: ServiceCategory.INSPECTION,
      basePrice: 199.99,
      features: [
        'Roof condition assessment',
        'Gutter and downspout inspection',
        'Chimney and vent examination',
        'Siding and exterior evaluation',
        'High-resolution photo documentation',
        'Comprehensive inspection report'
      ]
    },
    {
      name: 'Real Estate Photography',
      description: 'Professional aerial photography and videography to showcase properties from unique perspectives.',
      category: ServiceCategory.PHOTOGRAPHY,
      basePrice: 249.99,
      features: [
        'Aerial property photography',
        'Neighborhood context shots',
        'Twilight photography options',
        'High-resolution image delivery',
        'Multiple angle coverage',
        'Quick turnaround time'
      ]
    },
    {
      name: 'Event Aerial Coverage',
      description: 'Capture special events from above with professional drone photography and videography services.',
      category: ServiceCategory.CINEMATOGRAPHY,
      basePrice: 399.99,
      features: [
        'Live event coverage',
        '4K video recording',
        'Multiple camera angles',
        'Professional editing',
        'Same-day highlights reel',
        'Full event documentation'
      ]
    },
    {
      name: 'Construction Progress Documentation',
      description: 'Regular aerial documentation of construction projects for progress tracking and marketing purposes.',
      category: ServiceCategory.PHOTOGRAPHY,
      basePrice: 179.99,
      features: [
        'Scheduled progress shots',
        'Time-lapse compilation',
        'Site overview documentation',
        'Safety compliance monitoring',
        'Project milestone capture',
        'Client portal access'
      ]
    },
    {
      name: 'Agricultural Survey',
      description: 'Comprehensive aerial surveys for agricultural properties, crop monitoring, and land assessment.',
      category: ServiceCategory.INSPECTION,
      basePrice: 349.99,
      features: [
        'Crop health assessment',
        'Irrigation system inspection',
        'Boundary documentation',
        'Livestock monitoring',
        'Drainage evaluation',
        'Detailed mapping services'
      ]
    },
    {
      name: 'Infrastructure Inspection',
      description: 'Professional inspection services for bridges, towers, and other infrastructure using advanced drone technology.',
      category: ServiceCategory.INSPECTION,
      basePrice: 449.99,
      features: [
        'Structural integrity assessment',
        'Hard-to-reach area access',
        'Thermal imaging analysis',
        'Detailed damage documentation',
        'Safety compliance reporting',
        'Engineering-grade accuracy'
      ]
    },
    {
      name: 'Cinematic Aerial Videography',
      description: 'Professional cinematic drone videography for commercials, documentaries, and promotional content.',
      category: ServiceCategory.CINEMATOGRAPHY,
      basePrice: 599.99,
      features: [
        '4K cinematic recording',
        'Professional color grading',
        'Advanced flight patterns',
        'Multiple location coverage',
        'Custom music and editing',
        'Broadcast-quality delivery'
      ]
    }
  ];

    // Create services (skip if already exists)
    console.log('📝 Creating services...');
    for (const service of services) {
      try {
        // Check if service already exists
        const existing = await prisma.service.findFirst({
          where: { name: service.name }
        });

        if (existing) {
          console.log(`⏭️  Service already exists: ${service.name}`);
          continue;
        }

        const created = await prisma.service.create({
          data: service
        });
        console.log(`✅ Created service: ${created.name}`);
      } catch (error) {
        console.error(`❌ Failed to create service: ${service.name}`, error);
      }
    }

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
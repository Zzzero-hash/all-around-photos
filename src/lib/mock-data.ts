import { Photo, PhotoCategory } from '@prisma/client';
import { generatePlaceholderImage, getPlaceholderDimensions } from './placeholder-images';

// Mock photo data structure
const mockPhotoData = [
  {
    id: '1',
    filename: 'commercial-building-inspection-1.jpg',
    title: 'Downtown Office Complex Inspection',
    description: 'Comprehensive aerial inspection of a 12-story commercial office building, focusing on roof condition and structural integrity.',
    category: PhotoCategory.COMMERCIAL,
    metadata: {
      capturedAt: '2024-01-15T10:30:00Z',
      location: 'Downtown Business District',
      equipment: {
        drone: 'DJI Mavic 3 Enterprise',
        camera: 'Hasselblad L1D-20c',
        lens: '24mm equivalent'
      },
      technical: {
        altitude: '150 feet',
        resolution: '5472x3648'
      }
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    filename: 'residential-home-exterior-1.jpg',
    title: 'Modern Family Home Exterior',
    description: 'Beautiful aerial view of a contemporary family home with landscaped gardens and outdoor living spaces.',
    category: PhotoCategory.RESIDENTIAL,
    metadata: {
      capturedAt: '2024-01-20T14:15:00Z',
      location: 'Suburban Neighborhood',
      equipment: {
        drone: 'DJI Air 2S',
        camera: '1-inch CMOS',
        lens: '22mm equivalent'
      },
      technical: {
        altitude: '120 feet',
        resolution: '5472x3648'
      }
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    filename: 'real-estate-luxury-property-1.jpg',
    title: 'Luxury Waterfront Estate',
    description: 'Stunning aerial photography of a luxury waterfront estate featuring private dock and infinity pool.',
    category: PhotoCategory.REAL_ESTATE,
    metadata: {
      capturedAt: '2024-01-25T16:45:00Z',
      location: 'Lakefront District',
      equipment: {
        drone: 'DJI Mavic 3 Pro',
        camera: 'Hasselblad L2D-20c',
        lens: '24mm equivalent'
      },
      technical: {
        altitude: '200 feet',
        resolution: '5472x3648'
      }
    },
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '4',
    filename: 'commercial-warehouse-inspection-1.jpg',
    title: 'Industrial Warehouse Complex',
    description: 'Aerial inspection of large industrial warehouse facility, documenting roof conditions and loading dock areas.',
    category: PhotoCategory.COMMERCIAL,
    metadata: {
      capturedAt: '2024-02-01T09:00:00Z',
      location: 'Industrial Park',
      equipment: {
        drone: 'DJI Matrice 300 RTK',
        camera: 'Zenmuse P1',
        lens: '35mm equivalent'
      },
      technical: {
        altitude: '180 feet',
        resolution: '8192x5460'
      }
    },
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '5',
    filename: 'event-wedding-venue-1.jpg',
    title: 'Outdoor Wedding Ceremony',
    description: 'Aerial coverage of a beautiful outdoor wedding ceremony in a garden setting with mountain backdrop.',
    category: PhotoCategory.EVENT,
    metadata: {
      capturedAt: '2024-02-05T17:30:00Z',
      location: 'Mountain View Gardens',
      equipment: {
        drone: 'DJI Mini 3 Pro',
        camera: '1/1.3-inch CMOS',
        lens: '24mm equivalent'
      },
      technical: {
        altitude: '100 feet',
        resolution: '4032x3024'
      }
    },
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: '6',
    filename: 'residential-roof-inspection-1.jpg',
    title: 'Residential Roof Assessment',
    description: 'Detailed aerial inspection of residential roof showing shingle condition and gutter systems.',
    category: PhotoCategory.RESIDENTIAL,
    metadata: {
      capturedAt: '2024-02-10T11:20:00Z',
      location: 'Residential Area',
      equipment: {
        drone: 'DJI Air 2S',
        camera: '1-inch CMOS',
        lens: '22mm equivalent'
      },
      technical: {
        altitude: '80 feet',
        resolution: '5472x3648'
      }
    },
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '7',
    filename: 'real-estate-suburban-home-1.jpg',
    title: 'Charming Suburban Property',
    description: 'Aerial view of a well-maintained suburban home with mature landscaping and two-car garage.',
    category: PhotoCategory.REAL_ESTATE,
    metadata: {
      capturedAt: '2024-02-12T13:45:00Z',
      location: 'Maple Street Neighborhood',
      equipment: {
        drone: 'DJI Mavic Air 2',
        camera: '1/2-inch CMOS',
        lens: '24mm equivalent'
      },
      technical: {
        altitude: '120 feet',
        resolution: '4000x3000'
      }
    },
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-02-12'),
  },
  {
    id: '8',
    filename: 'commercial-solar-installation-1.jpg',
    title: 'Commercial Solar Panel Installation',
    description: 'Aerial documentation of large-scale solar panel installation on commercial building rooftop.',
    category: PhotoCategory.COMMERCIAL,
    metadata: {
      capturedAt: '2024-02-15T10:15:00Z',
      location: 'Green Energy Business Park',
      equipment: {
        drone: 'DJI Mavic 3 Enterprise',
        camera: 'Hasselblad L1D-20c',
        lens: '24mm equivalent'
      },
      technical: {
        altitude: '160 feet',
        resolution: '5472x3648'
      }
    },
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '9',
    filename: 'event-corporate-gathering-1.jpg',
    title: 'Corporate Team Building Event',
    description: 'Aerial coverage of outdoor corporate team building event with activities and catering setup.',
    category: PhotoCategory.EVENT,
    metadata: {
      capturedAt: '2024-02-18T14:30:00Z',
      location: 'Corporate Retreat Center',
      equipment: {
        drone: 'DJI Air 2S',
        camera: '1-inch CMOS',
        lens: '22mm equivalent'
      },
      technical: {
        altitude: '140 feet',
        resolution: '5472x3648'
      }
    },
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-02-18'),
  },
  {
    id: '10',
    filename: 'commercial-roof-inspection-1.jpg',
    title: 'Commercial Roof Inspection - Before Repairs',
    description: 'Comprehensive aerial inspection of commercial building roof identifying areas requiring maintenance and repair.',
    category: PhotoCategory.COMMERCIAL_INSPECTION,
    metadata: {
      capturedAt: '2024-02-20T08:45:00Z',
      location: 'Downtown Commercial District',
      inspectionType: 'roof',
      findings: 'major_issues',
      beforeAfter: {
        type: 'before',
        relatedPhotoId: '13'
      },
      equipment: {
        drone: 'DJI Mavic 3 Enterprise',
        camera: 'Hasselblad L1D-20c',
        thermalCamera: true,
        inspectionTools: ['Moisture meter', 'Infrared thermometer', 'Digital calipers']
      },
      technicalDetails: {
        altitude: '150 feet',
        resolution: '5472x3648',
        weatherConditions: 'Clear, 15mph winds',
        inspectionDate: '2024-02-20'
      }
    },
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: '11',
    filename: 'residential-pool-installation-1.jpg',
    title: 'Backyard Pool Installation',
    description: 'Aerial view of newly completed backyard pool installation with surrounding deck and landscaping.',
    category: PhotoCategory.RESIDENTIAL,
    metadata: {
      capturedAt: '2024-02-22T15:20:00Z',
      location: 'Residential Backyard',
      equipment: {
        drone: 'DJI Mini 3 Pro',
        camera: '1/1.3-inch CMOS',
        lens: '24mm equivalent'
      },
      technical: {
        altitude: '100 feet',
        resolution: '4032x3024'
      }
    },
    createdAt: new Date('2024-02-22'),
    updatedAt: new Date('2024-02-22'),
  },
  {
    id: '12',
    filename: 'real-estate-mountain-cabin-1.jpg',
    title: 'Mountain Retreat Cabin',
    description: 'Scenic aerial photography of rustic mountain cabin surrounded by forest and natural landscape.',
    category: PhotoCategory.REAL_ESTATE,
    metadata: {
      capturedAt: '2024-02-25T12:10:00Z',
      location: 'Mountain Forest Area',
      equipment: {
        drone: 'DJI Mavic 3 Pro',
        camera: 'Hasselblad L2D-20c',
        lens: '24mm equivalent'
      },
      technical: {
        altitude: '180 feet',
        resolution: '5472x3648'
      }
    },
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-02-25'),
  },
  {
    id: '13',
    filename: 'commercial-roof-inspection-after-1.jpg',
    title: 'Commercial Roof Inspection - After Repairs',
    description: 'Follow-up aerial inspection showing completed roof repairs and maintenance work.',
    category: PhotoCategory.COMMERCIAL_INSPECTION,
    metadata: {
      capturedAt: '2024-03-15T09:30:00Z',
      location: 'Downtown Commercial District',
      inspectionType: 'roof',
      findings: 'good',
      beforeAfter: {
        type: 'after',
        relatedPhotoId: '10'
      },
      equipment: {
        drone: 'DJI Mavic 3 Enterprise',
        camera: 'Hasselblad L1D-20c',
        thermalCamera: true,
        inspectionTools: ['Moisture meter', 'Infrared thermometer']
      },
      technicalDetails: {
        altitude: '150 feet',
        resolution: '5472x3648',
        weatherConditions: 'Clear, 10mph winds',
        inspectionDate: '2024-03-15'
      }
    },
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: '14',
    filename: 'residential-structural-inspection-1.jpg',
    title: 'Residential Structural Assessment',
    description: 'Detailed structural inspection of residential property foundation and exterior walls.',
    category: PhotoCategory.RESIDENTIAL_INSPECTION,
    metadata: {
      capturedAt: '2024-03-10T14:20:00Z',
      location: 'Suburban Residential Area',
      inspectionType: 'structural',
      findings: 'minor_issues',
      equipment: {
        drone: 'DJI Air 2S',
        camera: '1-inch CMOS',
        thermalCamera: false,
        inspectionTools: ['Crack gauge', 'Level', 'Measuring tape', 'Moisture detector']
      },
      technicalDetails: {
        altitude: '100 feet',
        resolution: '5472x3648',
        weatherConditions: 'Partly cloudy, calm',
        inspectionDate: '2024-03-10'
      }
    },
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
  },
  {
    id: '15',
    filename: 'residential-roof-thermal-inspection-1.jpg',
    title: 'Residential Roof Thermal Inspection',
    description: 'Thermal imaging inspection of residential roof identifying heat loss and insulation issues.',
    category: PhotoCategory.RESIDENTIAL_INSPECTION,
    metadata: {
      capturedAt: '2024-03-05T16:45:00Z',
      location: 'Residential Neighborhood',
      inspectionType: 'roof',
      findings: 'major_issues',
      equipment: {
        drone: 'DJI Mavic 3 Enterprise',
        camera: 'Hasselblad L1D-20c',
        thermalCamera: true,
        inspectionTools: ['Thermal imaging camera', 'Moisture meter', 'Insulation tester']
      },
      technicalDetails: {
        altitude: '120 feet',
        resolution: '5472x3648',
        weatherConditions: 'Clear, evening inspection for thermal contrast',
        inspectionDate: '2024-03-05'
      }
    },
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
  },
  {
    id: '16',
    filename: 'commercial-hvac-inspection-1.jpg',
    title: 'Commercial HVAC System Inspection',
    description: 'Aerial inspection of rooftop HVAC systems and ventilation equipment on commercial building.',
    category: PhotoCategory.COMMERCIAL_INSPECTION,
    metadata: {
      capturedAt: '2024-03-12T11:15:00Z',
      location: 'Industrial Business Park',
      inspectionType: 'hvac',
      findings: 'good',
      equipment: {
        drone: 'DJI Matrice 300 RTK',
        camera: 'Zenmuse P1',
        thermalCamera: true,
        inspectionTools: ['Vibration analyzer', 'Sound level meter', 'Thermal imaging']
      },
      technicalDetails: {
        altitude: '180 feet',
        resolution: '8192x5460',
        weatherConditions: 'Clear, mild temperature',
        inspectionDate: '2024-03-12'
      }
    },
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-03-12'),
  },
];

// Generate mock photos with placeholder images
export const mockPhotos: Photo[] = mockPhotoData.map((photo, index) => {
  const dimensions = getPlaceholderDimensions(index);
  const categoryKey = photo.category.toLowerCase().replace('_', '_');
  
  return {
    ...photo,
    isPublic: true,
    price: 25,
    watermarkUrl: null,
    inspectionData: photo.category.includes('INSPECTION') ? photo.metadata : null,
    reportId: null,
    storageUrl: generatePlaceholderImage(dimensions.width, dimensions.height, categoryKey, index),
    thumbnailUrl: generatePlaceholderImage(Math.floor(dimensions.width / 2), Math.floor(dimensions.height / 2), categoryKey, index),
  };
});

// Helper function to get photos by category
export function getPhotosByCategory(category: PhotoCategory | 'ALL'): Photo[] {
  if (category === 'ALL') {
    return mockPhotos.filter(photo => photo.isPublic);
  }
  return mockPhotos.filter(photo => photo.isPublic && photo.category === category);
}

// Helper function to get photo counts by category
export function getPhotoCounts(): Record<PhotoCategory | 'ALL', number> {
  const counts: Record<PhotoCategory | 'ALL', number> = {
    ALL: mockPhotos.filter(photo => photo.isPublic).length,
    COMMERCIAL: 0,
    RESIDENTIAL: 0,
    REAL_ESTATE: 0,
    EVENT: 0,
    OTHER: 0,
    COMMERCIAL_INSPECTION: 0,
    RESIDENTIAL_INSPECTION: 0,
  };

  mockPhotos.forEach(photo => {
    if (photo.isPublic) {
      counts[photo.category]++;
    }
  });

  return counts;
}
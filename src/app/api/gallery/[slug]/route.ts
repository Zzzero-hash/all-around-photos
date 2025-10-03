import { NextRequest, NextResponse } from 'next/server';

// Map of old image slugs to Unsplash URLs
const imageMap: Record<string, string> = {
  'agricultural-1.jpg': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
  'commercial-1.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  'construction-1.jpg': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
  'event-1.jpg': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
  'residential-1.jpg': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
  'waterfront-1.jpg': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const imageUrl = imageMap[slug];

  if (!imageUrl) {
    return new NextResponse('Image not found', { status: 404 });
  }

  // Fetch the image and return it directly instead of redirecting
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return new NextResponse('Image not found', { status: 404 });
    }
    
    const imageBuffer = await response.arrayBuffer();
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
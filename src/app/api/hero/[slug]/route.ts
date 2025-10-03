import { NextRequest, NextResponse } from 'next/server';

// Map of old hero image slugs to Unsplash URLs
const heroImageMap: Record<string, string> = {
  'drone-aerial-1.jpg': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop',
  'drone-aerial-2.jpg': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop',
  'drone-aerial-3.jpg': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const imageUrl = heroImageMap[slug];

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
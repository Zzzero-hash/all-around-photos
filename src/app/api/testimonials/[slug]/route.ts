import { NextRequest, NextResponse } from 'next/server';

// Map of testimonial image slugs to Unsplash URLs (professional headshots)
const testimonialImageMap: Record<string, string> = {
  'sarah-johnson.jpg': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  'mike-chen.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  'lisa-rodriguez.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  'david-thompson.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  'jennifer-white.jpg': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const imageUrl = testimonialImageMap[slug];

  if (!imageUrl) {
    return new NextResponse('Image not found', { status: 404 });
  }

  // Fetch the image and return it directly
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
// Generate placeholder images for development
export function generatePlaceholderImage(
  width: number,
  height: number,
  category: string,
  index: number
): string {
  // Create a simple data URL for a colored rectangle with text
  const colors = {
    commercial: '#1e40af', // primary-600
    residential: '#0ea5e9', // secondary-500
    real_estate: '#f97316', // accent-500
    event: '#10b981', // success-500
    other: '#64748b', // neutral-500
  };

  const color = colors[category as keyof typeof colors] || colors.other;
  
  // Create SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dy=".3em">
        ${category.toUpperCase()} ${index + 1}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Predefined aspect ratios for variety
const aspectRatios = [
  { width: 400, height: 300 }, // 4:3
  { width: 400, height: 500 }, // 4:5 (portrait)
  { width: 400, height: 250 }, // 16:10 (landscape)
  { width: 400, height: 600 }, // 2:3 (tall portrait)
  { width: 400, height: 200 }, // 2:1 (wide landscape)
];

export function getPlaceholderDimensions(index: number): { width: number; height: number } {
  const ratio = aspectRatios[index % aspectRatios.length];
  return ratio || { width: 400, height: 300 };
}
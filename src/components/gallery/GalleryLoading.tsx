export function GalleryLoading() {
  return (
    <div className="space-y-8">
      {/* Filter skeleton */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 bg-neutral-200 rounded-full animate-pulse"
          />
        ))}
      </div>

      {/* Gallery grid skeleton */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="break-inside-avoid"
          >
            <div
              className={`bg-neutral-200 rounded-lg animate-pulse ${
                i % 4 === 0 ? 'h-64' : 
                i % 4 === 1 ? 'h-80' : 
                i % 4 === 2 ? 'h-56' : 'h-72'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <h1 className="mb-4 text-6xl font-bold text-primary-600">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
          Page Not Found
        </h2>
        <p className="mb-8 text-neutral-600">
          Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or you may have entered an incorrect URL.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block rounded-lg bg-primary-600 px-6 py-3 text-white transition-colors hover:bg-primary-700"
          >
            Return Home
          </Link>
          <div>
            <Link
              href="/gallery"
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              View Our Gallery
            </Link>
            {' | '}
            <Link
              href="/services"
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
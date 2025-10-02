'use client';

import { useState } from 'react';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';
import { Card } from '@/components/ui/Card';
import type { CreateQuoteRequestInput } from '@/lib/validations';

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateQuoteRequestInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quote Request Submitted!
              </h1>
              <p className="text-lg text-gray-600">
                Thank you for your interest in All Around Photos LLC
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h2 className="font-semibold text-blue-900 mb-2">What happens next?</h2>
              <ul className="text-blue-800 space-y-2 text-left">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  We'll review your request within 24 hours
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  You'll receive a personalized quote via email
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  We'll schedule a consultation to discuss your vision
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">4.</span>
                  Book your session and capture amazing moments!
                </li>
              </ul>
            </div>

            <div className="text-sm text-gray-500 mb-6">
              <p>
                Questions? Contact us directly at{' '}
                <a href="mailto:photographer@allaroundphotos.com" className="text-blue-600 hover:underline">
                  photographer@allaroundphotos.com
                </a>{' '}
                or{' '}
                <a href="tel:+15551234567" className="text-blue-600 hover:underline">
                  (555) 123-4567
                </a>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/gallery"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                View Our Gallery
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Learn About Our Services
              </a>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Request a Quote
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to capture your special moments? Tell us about your photography needs 
            and we'll provide a personalized quote within 24 hours.
          </p>
        </div>

        {/* Service highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Portrait Sessions</h3>
            <p className="text-sm text-gray-600">Family, couple, and individual photography</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Event Photography</h3>
            <p className="text-sm text-gray-600">Birthdays, graduations, special occasions</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Aerial Photography</h3>
            <p className="text-sm text-gray-600">Unique drone perspectives and panoramic views</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Pet Photography</h3>
            <p className="text-sm text-gray-600">Comfortable sessions for all types of pets</p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error submitting quote request
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quote form */}
        <QuoteRequestForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';
import { BookingCalendar } from '@/components/forms/BookingCalendar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { CreateQuoteRequestInput } from '@/lib/validations';

type BookingStep = 'quote' | 'calendar' | 'confirmation';

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('quote');
  const [quoteData, setQuoteData] = useState<CreateQuoteRequestInput | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuoteSubmit = async (data: CreateQuoteRequestInput) => {
    setQuoteData(data);
    setCurrentStep('calendar');
  };

  const handleDateSelect = (date: Date, timeSlot: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
  };

  const handleBookingSubmit = async () => {
    if (!quoteData || !selectedDate || !selectedTimeSlot) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Combine quote data with booking information
      const bookingData = {
        ...quoteData,
        preferredDate: selectedDate,
        specialRequirements: `${quoteData.specialRequirements || ''}\n\nPreferred Time: ${selectedTimeSlot}`.trim()
      };

      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit booking request');
      }

      setIsSubmitted(true);
      setCurrentStep('confirmation');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToQuote = () => {
    setCurrentStep('quote');
  };

  const steps = [
    { id: 'quote', name: 'Quote Request', completed: currentStep !== 'quote' },
    { id: 'calendar', name: 'Select Date & Time', completed: currentStep === 'confirmation' },
    { id: 'confirmation', name: 'Confirmation', completed: false }
  ];

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
                Booking Request Submitted!
              </h1>
              <p className="text-lg text-gray-600">
                Your session request has been received
              </p>
            </div>

            {selectedDate && selectedTimeSlot && (
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h2 className="font-semibold text-blue-900 mb-2">Requested Session Details</h2>
                <div className="text-blue-800 space-y-1">
                  <p><strong>Service:</strong> {quoteData?.serviceType}</p>
                  <p><strong>Date:</strong> {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p><strong>Time:</strong> {selectedTimeSlot}</p>
                  <p><strong>Location:</strong> {quoteData?.location}</p>
                </div>
              </div>
            )}

            <div className="bg-amber-50 p-6 rounded-lg mb-6">
              <h2 className="font-semibold text-amber-900 mb-2">What happens next?</h2>
              <ul className="text-amber-800 space-y-2 text-left">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  We'll confirm your requested date and time within 24 hours
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  You'll receive a detailed quote and session information
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  We'll send a booking confirmation with preparation details
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">4.</span>
                  Get ready for an amazing photography session!
                </li>
              </ul>
            </div>

            <div className="text-sm text-gray-500 mb-6">
              <p>
                Need to make changes? Contact us at{' '}
                <a href="mailto:photographer@allaroundphotos.com" className="text-blue-600 hover:underline">
                  photographer@allaroundphotos.com
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
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Back to Home
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Session
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your photography needs and select your preferred date and time.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center space-x-8">
              {steps.map((step, stepIdx) => (
                <li key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                        {
                          'bg-blue-600 text-white': currentStep === step.id,
                          'bg-green-600 text-white': step.completed,
                          'bg-gray-200 text-gray-500': currentStep !== step.id && !step.completed
                        }
                      )}
                    >
                      {step.completed ? (
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        stepIdx + 1
                      )}
                    </div>
                    <span className={cn(
                      'ml-3 text-sm font-medium',
                      {
                        'text-blue-600': currentStep === step.id,
                        'text-green-600': step.completed,
                        'text-gray-500': currentStep !== step.id && !step.completed
                      }
                    )}>
                      {step.name}
                    </span>
                  </div>
                  {stepIdx < steps.length - 1 && (
                    <div className="ml-8 h-0.5 w-16 bg-gray-200" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
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
                    Error submitting booking request
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        {currentStep === 'quote' && (
          <QuoteRequestForm onSubmit={handleQuoteSubmit} isSubmitting={false} />
        )}

        {currentStep === 'calendar' && (
          <div className="space-y-6">
            <BookingCalendar
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              serviceType={quoteData?.serviceType}
            />

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBackToQuote}>
                Back to Quote Details
              </Button>

              <Button
                onClick={handleBookingSubmit}
                disabled={!selectedDate || !selectedTimeSlot || isSubmitting}
                loading={isSubmitting}
              >
                Submit Booking Request
              </Button>
            </div>

            {/* Summary */}
            {selectedDate && selectedTimeSlot && quoteData && (
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-4">Booking Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Service:</span> {quoteData.serviceType}</p>
                    <p><span className="font-medium">Client:</span> {quoteData.name}</p>
                    <p><span className="font-medium">Email:</span> {quoteData.email}</p>
                    <p><span className="font-medium">Location:</span> {quoteData.location}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Date:</span> {selectedDate.toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {selectedTimeSlot}</p>
                    <p><span className="font-medium">Timeline:</span> {quoteData.timeline}</p>
                    {quoteData.budget && <p><span className="font-medium">Budget:</span> {quoteData.budget}</p>}
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
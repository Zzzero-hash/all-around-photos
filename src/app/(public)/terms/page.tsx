import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Terms of Service | All Around Photos LLC',
  description: 'Terms of service for All Around Photos LLC drone photography services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-neutral-90 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-neutral-700">
            <p className="mb-6">
              <strong>Last updated:</strong> October 2, 2025
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Acceptance of Terms</h2>
            <p className="mb-6">
              By using All Around Photos LLC services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Services Provided</h2>
            <p className="mb-6">
              All Around Photos LLC provides professional drone photography and inspection services. 
              All services are subject to FAA regulations and local flight restrictions. 
              We reserve the right to modify or discontinue services at any time.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Booking and Payment</h2>
            <p className="mb-6">
              All bookings require advance notice and are subject to availability. 
              Payment is due as specified in your service agreement. 
              Cancellations must be made at least 24 hours in advance to avoid fees.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Weather and Scheduling</h2>
            <p className="mb-6">
              Services are weather-dependent and may be rescheduled due to unsafe flying conditions. 
              We will make reasonable efforts to reschedule at your convenience. 
              No additional fees will be charged for weather-related rescheduling.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Intellectual Property</h2>
            <p className="mb-6">
              All photographs and videos created by All Around Photos LLC remain our intellectual property 
              unless otherwise transferred in writing. Clients may use provided content for their intended 
              business purposes as specified in the service agreement.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Liability</h2>
            <p className="mb-6">
              All Around Photos LLC maintains comprehensive liability insurance. 
              We are not liable for indirect, incidental, or consequential damages. 
              Our total liability is limited to the amount paid for the services in question.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Equipment and Safety</h2>
            <p className="mb-6">
              All equipment is maintained according to manufacturer specifications and FAA requirements. 
              We follow all safety protocols and maintain safe distances from people and property. 
              Client property access must be authorized and safe for operations.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Modifications</h2>
            <p className="mb-6">
              These terms may be modified at any time. Continued use of our services constitutes 
              acceptance of any changes. Significant changes will be communicated to clients.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Contact Information</h2>
            <p className="mb-6">
              For questions about these terms, please contact us at info@allaroundphotos.com 
              or through our contact form.
            </p>

            <p className="mt-8 text-sm text-neutral-500">
              By using our services, you acknowledge that you have read, understood, and agree 
              to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

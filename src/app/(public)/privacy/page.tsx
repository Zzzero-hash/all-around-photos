import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Privacy Policy | All Around Photos LLC',
  description: 'Privacy policy for All Around Photos LLC drone photography services.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-neutral-90 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-neutral-700">
            <p className="mb-6">
              <strong>Last updated:</strong> October 2, 2025
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Information We Collect</h2>
            <p className="mb-6">
              We collect information you provide directly to us, including when you contact us for services, 
              book sessions, or communicate with our team. This may include your name, email address, 
              phone number, and project details.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">How We Use Your Information</h2>
            <p className="mb-6">
              We use the information we collect to provide our drone photography services, 
              communicate with you about your projects, process payments, and improve our services.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Photography and Video Content</h2>
            <p className="mb-6">
              All photographs and videos captured during our services remain the property of our clients 
              unless otherwise agreed upon in writing. We may use your content for portfolio purposes 
              with your explicit permission.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Data Security</h2>
            <p className="mb-6">
              We implement appropriate security measures to protect your information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Third-Party Services</h2>
            <p className="mb-6">
              We may use third-party services for payment processing, website analytics, 
              and other business operations. These services have their own privacy policies 
              that govern how they use your data.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Your Rights</h2>
            <p className="mb-6">
              You have the right to access, correct, or delete your personal information. 
              You may also opt out of certain communications or request that we stop processing 
              your data for specific purposes.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have questions about this privacy policy or concerns about your privacy, 
              please contact us at info@allaroundphotos.com or through our contact form.
            </p>

            <p className="mt-8 text-sm text-neutral-500">
              This privacy policy may be updated from time to time. We will notify you of 
              significant changes by posting the new policy on our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

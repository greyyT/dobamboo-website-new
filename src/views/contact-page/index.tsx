import Screen from '@/components/screen';

import ContactForm from './contact-form';
import ContactSocials from './contact-socials';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <Screen className="py-6 sm:py-8 lg:py-12 xl:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 w-full">
            <div className="order-2 lg:order-1 lg:col-span-2">
              <ContactSocials />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </Screen>
    </div>
  );
}

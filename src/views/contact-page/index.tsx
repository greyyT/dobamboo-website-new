import Screen from '@/components/screen';

import ContactForm from './contact-form';
import ContactSocials from './contact-socials';

export default function ContactPage() {
  return (
    <Screen className="mt-4 md:mt-12 lg:mt-20 px-20">
      <div className="grid grid-cols-1 direction-reverse md:grid-cols-2 gap-16 w-full">
        <ContactSocials />
        <ContactForm />
      </div>
    </Screen>
  );
}

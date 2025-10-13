import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const ContactSocials: FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Company Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-6 sm:mb-8">
        <div className="text-center lg:text-left">
          <h3 className="text-xl sm:text-2xl text-primary font-semibold mb-4">Dobamboo</h3>
          <div className="text-gray-600 space-y-1">
            <p className="text-sm sm:text-base">3844 West Northside Drive</p>
            <p className="text-sm sm:text-base">Jackson, MS 39209</p>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-6 sm:mb-8">
        <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 text-center lg:text-left">
          Contact Information
        </h4>

        <div className="space-y-4 sm:space-y-6">
          {/* Phone */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="font-medium text-gray-700 text-sm sm:text-base min-w-0 sm:min-w-[120px]">Phone</p>
            <a
              className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors"
              href="tel:842462776611"
            >
              +84 24 6277 6611
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="font-medium text-gray-700 text-sm sm:text-base min-w-0 sm:min-w-[120px]">Email</p>
            <a
              className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors break-all"
              href="mailto:halinh@handmadevn.vn"
            >
              halinh@handmadevn.vn
            </a>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
        <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 text-center lg:text-left">Follow Us</h4>

        <div className="flex justify-center lg:justify-start gap-4 sm:gap-6">
          <Link
            href="/"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors group"
            aria-label="Facebook"
          >
            <Image
              src="/images/facebook.png"
              alt="Facebook"
              width={24}
              height={24}
              className="sm:w-7 sm:h-7 group-hover:scale-110 transition-transform"
            />
          </Link>
          <Link
            href="/"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors group"
            aria-label="Pinterest"
          >
            <Image
              src="/images/pinterest.png"
              alt="Pinterest"
              width={24}
              height={24}
              className="sm:w-7 sm:h-7 group-hover:scale-110 transition-transform"
            />
          </Link>
          <Link
            href="/"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors group"
            aria-label="Instagram"
          >
            <Image
              src="/images/instagram.png"
              alt="Instagram"
              width={24}
              height={24}
              className="sm:w-7 sm:h-7 group-hover:scale-110 transition-transform"
            />
          </Link>
          <Link
            href="/"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors group"
            aria-label="LinkedIn"
          >
            <Image
              src="/images/linkedin.png"
              alt="LinkedIn"
              width={24}
              height={24}
              className="sm:w-7 sm:h-7 group-hover:scale-110 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactSocials;

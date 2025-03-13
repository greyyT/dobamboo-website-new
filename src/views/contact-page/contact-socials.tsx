import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const ContactSocials: FC = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h3 className="text-lg text-primary font-medium">Dobamboo</h3>
      <p className="text-sm mt-2">3844 West Northside Drive</p>
      <p className="text-sm">Jackson, MS 39209</p>
      <div className="mt-8 flex gap-8 items-center">
        <p className="font-semibold uppercase">Phone number</p>
        <a className="text-sm" href="callto:842462776611">
          +84 24 6277 6611
        </a>
      </div>
      <div className="mt-2 flex gap-8 items-center">
        <p className="font-semibold uppercase">Email</p>
        <a className="text-sm" href="callto:842462776611">
          halinh@handmadevn.vn
        </a>
      </div>
      <h4 className="uppercase text-lg mt-8 text-subtitle font-semibold tracking-[0.5px]">Follow us on</h4>
      <div className="flex gap-6 mt-4">
        <Link href="/" className="h-10 block relative">
          <Image src="/images/facebook.png" alt="Facebook" width={30} height={30} />
        </Link>
        <Link href="/" className="h-10 block relative">
          <Image src="/images/pinterest.png" alt="Pinterest" width={30} height={30} />
        </Link>
        <Link href="/" className="h-10 block relative">
          <Image src="/images/instagram.png" alt="Instagram" width={30} height={30} />
        </Link>
      </div>
    </div>
  );
};

export default ContactSocials;

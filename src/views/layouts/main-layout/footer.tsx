import Image from 'next/image';
import Link from 'next/link';

import { Route } from '@/constants/route';

export default function Footer() {
  return (
    <footer className="mt-10 pb-10 bg-main-bg pt-6 flex flex-col items-center px-4">
      <ul className="flex flex-col sm:grid sm:grid-cols-3 lg:grid-cols-4 w-300 max-w-full lg:px-4 gap-y-4">
        <li>
          <h4 className="uppercase text-[15px] text-subtitle leading-6 font-semibold tracking-[0.5px]">About</h4>
          <Link href={Route.OUR_STORY} className="text-sm text-[#0e1112] block">
            Our Story
          </Link>
          <Link href={Route.OUR_STORY} className="text-sm text-[#0e1112] block">
            Doug & Susan&apos;s Kids Foundation
          </Link>
          <Link href={Route.OUR_STORY} className="text-sm text-[#0e1112] block">
            Meet the Team
          </Link>
          <Link href={Route.OUR_STORY} className="text-sm text-[#0e1112] block">
            Blog
          </Link>
        </li>
        <li>
          <h4 className="uppercase text-[15px] text-subtitle leading-6 font-semibold tracking-[0.5px]">
            Business Fields
          </h4>
          <Link href={Route.OUR_STORY} className="text-sm text-[#0e1112] block">
            Product Supply
          </Link>
          <Link href={Route.OUR_STORY} className="text-sm text-[#0e1112] block">
            Developing Solutions
          </Link>
        </li>
        <li>
          <h4 className="uppercase text-[15px] text-subtitle leading-6 font-semibold tracking-[0.5px]">Contact</h4>
          <Link href={Route.OUR_STORY} className="text-sm text-[#0e1112] block">
            Apply for a Wholesale Account
          </Link>
          <Link href={Route.OUR_STORY} className="text-sm text-[#0e1112] block">
            Careers
          </Link>
          <Link href={Route.OUR_STORY} className="text-sm text-[#0e1112] block">
            Contact us
          </Link>
        </li>
        <li className="max-lg:col-start-3 max-lg:row-start-1">
          <h4 className="uppercase text-[15px] text-subtitle leading-6 font-semibold tracking-[0.5px]">Follow us on</h4>
          <div className="flex gap-6 mt-5">
            <Link href={Route.HOME} className="h-10 block relative">
              <Image src="/images/facebook.png" alt="Facebook" width={30} height={30} />
            </Link>
            <Link href={Route.HOME} className="h-10 block relative">
              <Image src="/images/pinterest.png" alt="Pinterest" width={30} height={30} />
            </Link>
            <Link href={Route.HOME} className="h-10 block relative">
              <Image src="/images/instagram.png" alt="Instagram" width={30} height={30} />
            </Link>

            <Link href={Route.HOME} className="h-10 block relative">
              <div className="w-7.5 h-7.5 bg-slate-600/80">
                <Image src="/images/linkedin.png" alt="Instagram" width={30} height={30} />
              </div>
            </Link>
          </div>
        </li>
      </ul>
    </footer>
  );
}

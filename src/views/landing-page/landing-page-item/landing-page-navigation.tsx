import Image from 'next/image';
import Link from 'next/link';

import { LandingPageItemData, LandingPageType } from '@/types/landing-page-item-data';

interface ILandingPageNavigationProps {
  data: Extract<LandingPageItemData, { type: LandingPageType.NAVIGATION }>;
}

export default function LandingPageNavigation({ data }: ILandingPageNavigationProps) {
  const { data: navigations } = data;
  return (
    <div className="flex justify-between gap-8 relative py-10">
      {navigations.map((item, idx) => (
        <Link href={item.redirectUrl} key={idx} className="w-full pb-60 relative">
          <Image key={idx} src={item.imageUrl} alt="Image" fill objectFit="cover" className="relative w-full h-full" />
        </Link>
      ))}
    </div>
  );
}

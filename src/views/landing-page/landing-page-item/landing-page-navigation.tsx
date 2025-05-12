import Image from 'next/image';
import Link from 'next/link';

import { LandingPageItemData, LandingPageType } from '@/types/landing-page-item-data';

interface ILandingPageNavigationProps {
  data: Extract<LandingPageItemData, { type: LandingPageType.NAVIGATION }>;
}

export default function LandingPageNavigation({ data }: ILandingPageNavigationProps) {
  const { data: images } = data;
  return (
    <div className="flex justify-between gap-8 relative py-10">
      {images.map((image, idx) => (
        <Link href={'/'} key={idx} className="w-full pb-60 relative">
          <Image key={idx} src={image} alt="Image" fill className="relative w-full h-full" />
        </Link>
      ))}
    </div>
  );
}

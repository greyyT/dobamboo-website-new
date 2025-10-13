import { View } from '@prisma/client';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import WillRender from '@/components/will-render';
import { cn } from '@/lib/utils';
import { LandingPageItemData, LandingPageType } from '@/types/landing-page-item-data';

interface ILandingPageShopDetailProps {
  data: Extract<LandingPageItemData, { type: LandingPageType.SHOP_DETAIL }>;
}

const LandingPageShopDetail = async ({ data }: ILandingPageShopDetailProps) => {
  const t = await getTranslations(View.LANDING_PAGE);

  // Check if translation exists, return null if not
  if (!t.has(data.id)) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row gap-8 px-6',
        data.data.direction === 'inverted' && 'lg:flex-row-reverse',
      )}
    >
      <div className={cn('flex-1 relative max-lg:pb-[30%]', data.data.variant === 'none' && 'lg:pb-[20%]')}>
        <Image src={data.data.mainImage} alt="Landing" fill objectFit="cover" />
      </div>
      <div className="flex-1">
        <p className="text-paragraph leading-7 font-light">{t(data.id)}</p>
        <WillRender when={data.data.variant !== 'none'}>
          <div className="grid grid-cols-3 gap-8 mt-4">
            {data.data.subImages?.map((image, idx) => (
              <AspectRatio key={idx + image} ratio={1 / 1}>
                <Image
                  src={image}
                  alt="Landing"
                  fill
                  objectFit="cover"
                  className={cn(data.data.variant === 'circle' && 'rounded-full')}
                />
              </AspectRatio>
            ))}
          </div>
        </WillRender>
      </div>
    </div>
  );
};

export default LandingPageShopDetail;

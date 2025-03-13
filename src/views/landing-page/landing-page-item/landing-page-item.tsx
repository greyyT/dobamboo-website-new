import React, { FC } from 'react';

import { LandingPageItemData, LandingPageType } from '@/types/landing-page-item-data';

import LandingPageCarousel from './landing-page-carousel';
import LandingPageProductShowcase from './landing-page-product-showcase';
import LandingPageShopDetail from './landing-page-shop-detail';

interface ILandingPageItemProps {
  item: LandingPageItemData;
}

const LandingPageItem: FC<ILandingPageItemProps> = ({ item }) => {
  if (item.type === LandingPageType.CAROUSEL) {
    return <LandingPageCarousel data={item} />;
  }

  if (item.type === LandingPageType.SHOP_DETAIL) {
    return <LandingPageShopDetail data={item} />;
  }

  return <LandingPageProductShowcase data={item} />;
};

export default LandingPageItem;

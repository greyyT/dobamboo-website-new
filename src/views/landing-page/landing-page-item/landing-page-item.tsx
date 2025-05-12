import React, { FC } from 'react';

import { LandingPageItemData, LandingPageType } from '@/types/landing-page-item-data';

import LandingPageCarousel from './landing-page-carousel';
import LandingPageNavigation from './landing-page-navigation';
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

  if (item.type === LandingPageType.NAVIGATION) {
    return <LandingPageNavigation data={item} />;
  }

  return null;
};

export default LandingPageItem;

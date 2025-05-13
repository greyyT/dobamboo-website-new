export enum LandingPageType {
  CAROUSEL = 'CAROUSEL',
  NAVIGATION = 'NAVIGATION',
  PRODUCT_SHOWCASE = 'PRODUCT_SHOWCASE',
  BROWSE_CATEGORY = 'BROWSE_CATEGORY',
  SHOP_DETAIL = 'SHOP_DETAIL',
}

type BaseLandingPageItemData = {
  id: string;
  order: number;
};

type CarouselItem = {
  imageUrl: string;
  redirectUrl: string;
};

export type LandingPageItemData = BaseLandingPageItemData &
  (
    | { type: LandingPageType.CAROUSEL; data: CarouselItem[] }
    | { type: LandingPageType.NAVIGATION; data: string[] }
    | { type: LandingPageType.PRODUCT_SHOWCASE; data: string[] }
    | { type: LandingPageType.BROWSE_CATEGORY; data: string[] }
    | {
        type: LandingPageType.SHOP_DETAIL;
        data: {
          mainImage: string;
          subImages: string[] | null;
          direction: 'normal' | 'inverted';
          variant: 'square' | 'circle' | 'none';
        };
      }
  );

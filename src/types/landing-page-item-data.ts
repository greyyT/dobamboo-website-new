export enum LandingPageType {
  CAROUSEL = 'CAROUSEL',
  PRODUCT_SHOWCASE = 'PRODUCT_SHOWCASE',
  SHOP_DETAIL = 'SHOP_DETAIL',
}

type BaseLandingPageItemData = {
  id: string;
  order: number;
};

export type LandingPageItemData = BaseLandingPageItemData &
  (
    | {
        type: LandingPageType.CAROUSEL;
        data: string[];
      }
    | {
        type: LandingPageType.PRODUCT_SHOWCASE;
        data: string[];
      }
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

import { getAllLandingPageItems } from '@/services/landing-page/get-all-landing-page-items';

import LandingPageBrowseCategory from './landing-page-item/landing-page-browse-category/landing-page-browse-category';
import LandingPageBrowseProducts from './landing-page-item/landing-page-browse-products/landing-page-browse-products';
import LandingPageItem from './landing-page-item/landing-page-item';
import LandingPageLatestNews from './landing-page-item/landing-page-latest-news/landing-page-latest-news';
import LandingPageRecentProducts from './landing-page-item/landing-page-recent-products/landing-page-recent-products';

const LandingPageView = async () => {
  const landingPageItems = await getAllLandingPageItems();

  return (
    <main className="flex justify-center mt-2 lg:mt-4 px-4">
      <div className="w-full max-w-300 flex flex-col lg:px-4 gap-12">
        {landingPageItems.map((item, idx) => (
          <LandingPageItem key={idx} item={item} />
        ))}
        <div className="flex flex-col gap-16">
          <LandingPageBrowseCategory />
          <LandingPageBrowseProducts />
          <LandingPageRecentProducts />
          <LandingPageLatestNews />
        </div>
      </div>
    </main>
  );
};

export default LandingPageView;

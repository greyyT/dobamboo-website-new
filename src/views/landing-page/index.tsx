import { getAllLandingPageItems } from '@/services/landing-page/get-all-landing-page-items';

import LandingPageItem from './landing-page-item/landing-page-item';

const LandingPageView = async () => {
  const landingPageItems = await getAllLandingPageItems();

  return (
    <main className="flex justify-center mt-2 lg:mt-4 px-4">
      <div className="w-full max-w-300 flex flex-col lg:px-4 gap-12">
        {landingPageItems.map((item, idx) => (
          <LandingPageItem key={idx} item={item} />
        ))}
      </div>
    </main>
  );
};

export default LandingPageView;

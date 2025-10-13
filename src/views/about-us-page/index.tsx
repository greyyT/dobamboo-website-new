import React from 'react';

import OurStoryPage from './our-story-page';
import OverviewPage from './overview-page';
import TabSelect from './tab-select';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen">
      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100 px-4 sm:px-6 lg:px-8">
        <TabSelect />
      </div>

      {/* Page Content */}
      <div className="mt-6 sm:mt-8 lg:mt-12">
        <OverviewPage />
        <OurStoryPage />
      </div>
    </div>
  );
};

export default AboutUsPage;

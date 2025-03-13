import React from 'react';

import OurStoryPage from './our-story-page';
import OverviewPage from './overview-page';
import TabSelect from './tab-select';

const AboutUsPage = () => {
  return (
    <div>
      <TabSelect />
      <div className="mt-12">
        <OverviewPage />
        <OurStoryPage />
      </div>
    </div>
  );
};

export default AboutUsPage;

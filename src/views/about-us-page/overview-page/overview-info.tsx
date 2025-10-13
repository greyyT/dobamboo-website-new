import Screen from '@/components/screen';

import { OverviewRowSection, OverviewRowSectionContent } from './overview-components';

const OverviewInfo = () => {
  return (
    <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
      {/* Hero Section */}
      <div className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <Screen>
          <OverviewRowSection
            variant="heading"
            title="About Us"
            imageUrl="https://dobamboo-demo.vercel.app/images/section1-1.jpg"
          >
            <OverviewRowSectionContent>
              Dobamboo's company and culture are a lot like our product. They're crafted, not cobbled, for a delightful
              experience.
            </OverviewRowSectionContent>
          </OverviewRowSection>
        </Screen>
      </div>

      {/* Mission Section */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Screen>
          <OverviewRowSection
            variant="normal"
            title="Our mission: Providing others with our bamboo products"
            imageUrl="https://dobamboo-demo.vercel.app/images/section1-1.jpg"
            isReverse
          >
            <OverviewRowSectionContent>
              We believe not just in growing bigger, but in growing better. And growing better means aligning the
              success of your own business with the success of your customers. Win-win!
            </OverviewRowSectionContent>
          </OverviewRowSection>
        </Screen>
      </div>

      {/* Story Section */}
      <div className="px-4 sm:px-6 lg:px-8">
        <Screen>
          <OverviewRowSection
            variant="normal"
            title="Our Story"
            imageUrl="https://dobamboo-demo.vercel.app/images/section1-1.jpg"
          >
            <OverviewRowSectionContent>
              In 2004, fellow MIT graduate students Brian Halligan and Dharmesh Shah noticed a major shift in the way
              people shop and purchase products. Buyers didn't want to be interrupted by ads, they wanted helpful
              information. In 2006, they founded HubSpot to help companies use that shift to grow better with inbound
              marketing.
            </OverviewRowSectionContent>
            <OverviewRowSectionContent>
              Along the way, HubSpot expanded beyond marketing into a crafted, not cobbled suite of products that create
              the frictionless customer experience that buyers expect today. Expertly led by CEO Yamini Rangan, HubSpot
              uses its customer platform built on an AI-powered Smart CRM to help millions of scaling organizations grow
              better.
            </OverviewRowSectionContent>
          </OverviewRowSection>
        </Screen>
      </div>
    </div>
  );
};

export default OverviewInfo;

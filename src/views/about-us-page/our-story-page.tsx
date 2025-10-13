'use client';

import { useSearchParams } from 'next/navigation';

import Screen from '@/components/screen';
import { AboutUsSearchParams, AboutUsTabKey } from '@/constants/query-params';
import { cn } from '@/lib/utils';

const OurStoryPage = () => {
  const searchParams = useSearchParams();
  const isActive = searchParams.get(AboutUsSearchParams.Tab) === AboutUsTabKey.OurStory;

  return (
    <div className={cn(!isActive && 'hidden')}>
      <Screen>
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">THE TREVITA STORY</h1>
          </div>

          {/* Content */}
          <div className="prose prose-sm sm:prose-base lg:prose-lg mx-auto max-w-none">
            <p className="text-sm sm:text-base text-zinc-600 leading-6 sm:leading-7 mb-6 sm:mb-8 text-center lg:text-left">
              It was a beautiful sun-drenched day in the colorful market square of Ocho Rios, Jamaica when fate was
              about to tap Doug and Susan Williams on the shoulder. The year was 1984, and the young couple had taken
              one of those "Five days for $500… come back to Jamaica" trips with their best friends Andy and Debbie.
              That typical sunny day found Debbie and Susan shopping for souvenirs while the boys drank Red Stripe under
              a palm tree.
            </p>

            {/* Video Section */}
            <div className="my-8 sm:my-12 lg:my-16">
              <div className="relative w-full max-w-4xl mx-auto">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/n2tkgeFcMhc?si=RIRdi7Sv1vcECfxI"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-zinc-800 mb-4 sm:mb-6 leading-6 sm:leading-7">
              It was that fateful moment when Susan held up a basket and yelled back to Doug, "I paid $40 for a basket
              just like this back home." Doug yelled back, "How much are you paying for that one?" When Susan said two
              dollars, legend has it that you could see the dollar signs ringing up in Doug's eyes$$$$$$$$$$$$$.
            </p>

            <p className="text-sm sm:text-base text-zinc-800 mb-4 sm:mb-6 leading-6 sm:leading-7">
              Susan and Doug were doing flea markets back home selling their artwork painted on old barn wood to make
              ends meet as a young married couple. And, both thought that the baskets would make a great addition to
              their flea market endeavors. So, Andy and Debbie, being best friends and all, helped the Williams carry as
              many baskets as possible on the plane home… and what a sight they were… back in the day when you could do
              stuff like that on an airplane.
            </p>

            <p className="text-sm sm:text-base text-zinc-800 mb-4 sm:mb-6 leading-6 sm:leading-7">
              Back home, Doug just couldn't get the 2000% mark up out of his head. So, he posed the idea to Susan of
              returning to Jamaica to try and import the baskets back to Mississippi. Now Doug and Susan knew next to
              nothing about importing, so they learned. Well, Doug did… because the couple didn't have enough money for
              both to make the return trip to Jamaica. As the story goes, it was Doug who convinced the Jamaican Trade
              Council to ship a container load of baskets to Jackson, Mississippi with no money down and 30 days to pay.
              That was miracle number one of many miracles to follow in the life of a true entrepreneurial company.
            </p>

            <p className="text-sm sm:text-base text-zinc-800 mb-6 sm:mb-8 leading-6 sm:leading-7">
              Nothing in their life would ever be the same after that first container pulled into their driveway. They
              unloaded the whole container themselves into their garage, and three flea market weekends later the whole
              container load of baskets was sold. The bill was paid and another container was ordered. The flea market
              business continued like that for two years, until one day a flea market shopper, who was buying up baskets
              for her retail shop, said "You guys should try and sell these at the Dallas Wholesale Show."
            </p>

            {/* Image Gallery */}
            <div className="my-8 sm:my-12 lg:my-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://dobamboo-demo.vercel.app/images/section1-1.jpg"
                    alt="Company History Image 1"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://dobamboo-demo.vercel.app/images/section1-4.jpg"
                    alt="Company History Image 2"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-zinc-800 leading-6 sm:leading-7">
              So, Doug and Susan set their sights for the Dallas Wholesale Show; but along with the regular Jamaican
              baskets, Susan had stumbled upon an idea that would become a turning point for the now full fledged
              wholesale company named Country Originals. It would be a brand new introduction that came to Susan one
              day. While studying the unique rounded shape of the Jamaican baskets… Susan saw a watermelon. She sent the
              design to Jamaica along with kegs of Rit Dye and the famous watermelon basket was born. Some of you, who
              have been in business long enough, may remember the long line to get into their booth. The watermelon
              basket and the newly named Country Originals Company were the hit of the Dallas Wholesale Show… the month
              was July, the year was 1986.
            </p>
          </div>
        </div>
      </Screen>
    </div>
  );
};

export default OurStoryPage;

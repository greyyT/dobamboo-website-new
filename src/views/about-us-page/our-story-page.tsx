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
        <h1 className="text-2xl font-bold text-center">THE TREVITA STORY</h1>
        <p className="text-base text-zinc-600/80 leading-6 mt-8">
          It was a beautiful sun-drenched day in the colorful market square of Ocho Rios, Jamaica when fate was about to
          tap Doug and Susan Williams on the shoulder. The year was 1984, and the young couple had taken one of those
          “Five days for $500… come back to Jamaica” trips with their best friends Andy and Debbie. That typical sunny
          day found Debbie and Susan shopping for souvenirs while the boys drank Red Stripe under a palm tree.
        </p>
        <div className="mt-8 flex justify-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/n2tkgeFcMhc?si=RIRdi7Sv1vcECfxI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p className="text-sm text-zinc-800 mt-4">
          It was that fateful moment when Susan held up a basket and yelled back to Doug, “I paid $40 for a basket just
          like this back home.” Doug yelled back, “How much are you paying for that one?” When Susan said two dollars,
          legend has it that you could see the dollar signs ringing up in Doug’s eyes$$$$$$$$$$$$$.
        </p>
        <p className="text-sm text-zinc-800 mt-4">
          Susan and Doug were doing flea markets back home selling their artwork painted on old barn wood to make ends
          meet as a young married couple. And, both thought that the baskets would make a great addition to their flea
          market endeavors. So, Andy and Debbie, being best friends and all, helped the Williams carry as many baskets
          as possible on the plane home… and what a sight they were… back in the day when you could do stuff like that
          on an airplane.
        </p>
        <p className="text-sm text-zinc-800 mt-4">
          Back home, Doug just couldn’t get the 2000% mark up out of his head. So, he posed the idea to Susan of
          returning to Jamaica to try and import the baskets back to Mississippi. Now Doug and Susan knew next to
          nothing about importing, so they learned. Well, Doug did… because the couple didn’t have enough money for both
          to make the return trip to Jamaica. As the story goes, it was Doug who convinced the Jamaican Trade Council to
          ship a container load of baskets to Jackson, Mississippi with no money down and 30 days to pay. That was
          miracle number one of many miracles to follow in the life of a true entrepreneurial company.
        </p>
        <p className="text-sm text-zinc-800 mt-4">
          Nothing in their life would ever be the same after that first container pulled into their driveway. They
          unloaded the whole container themselves into their garage, and three flea market weekends later the whole
          container load of baskets was sold. The bill was paid and another container was ordered. The flea market
          business continued like that for two years, until one day a flea market shopper, who was buying up baskets for
          her retail shop, said “You guys should try and sell these at the Dallas Wholesale Show.”
        </p>
        <div className="my-12 grid grid-cols-2 gap-8 items-center">
          <img src="https://dobamboo-demo.vercel.app/images/section1-1.jpg" alt="" />
          <img src="https://dobamboo-demo.vercel.app/images/section1-4.jpg" alt="" />
        </div>
        <p className="text-sm text-zinc-800">
          So, Doug and Susan set their sights for the Dallas Wholesale Show; but along with the regular Jamaican
          baskets, Susan had stumbled upon an idea that would become a turning point for the now full fledged wholesale
          company named Country Originals. It would be a brand new introduction that came to Susan one day. While
          studying the unique rounded shape of the Jamaican baskets… Susan saw a watermelon. She sent the design to
          Jamaica along with kegs of Rit Dye and the famous watermelon basket was born. Some of you, who have been in
          business long enough, may remember the long line to get into their booth. The watermelon basket and the newly
          named Country Originals Company were the hit of the Dallas Wholesale Show… the month was July, the year was
          1986.
        </p>
      </Screen>
    </div>
  );
};

export default OurStoryPage;

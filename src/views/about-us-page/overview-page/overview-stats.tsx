import Screen from '@/components/screen';

import { OverviewCard } from './overview-components';

const OverviewStats = () => {
  const stats = [
    {
      image: '/images/heritage.png',
      alt: 'Heritage',
      title: '400+ YEARS',
      description: 'Craft heritage of the village',
    },
    {
      image: '/images/craftsmanship.png',
      alt: 'Craftsmanship',
      title: '100+ YEARS',
      description: 'Hands-on family craftsmanship',
    },
    {
      image: '/images/lifestyle-product.png',
      alt: 'Lifestyle product',
      title: '5+ CATEGORIES',
      description: 'Home & lifestyle products',
    },
    {
      image: '/images/long-term-goals.png',
      alt: 'Long-term growth',
      title: 'STEP BY STEP',
      description: 'Built for long-term growth',
    },
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-slate-50">
      <Screen>
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">Trevita By the numbers</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map(stat => (
            <OverviewCard
              key={stat.title}
              icon={<img src={stat.image} alt={stat.alt} className="w-full h-full object-cover" />}
              title={stat.title}
              description={stat.description}
            />
          ))}
        </div>
      </Screen>
    </div>
  );
};

export default OverviewStats;

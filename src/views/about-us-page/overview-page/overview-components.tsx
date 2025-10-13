import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface IOverviewRowSectionProps {
  variant: 'normal' | 'heading';
  title: string;
  isReverse?: boolean;
  imageUrl: string;
  children: ReactNode;
}

export const OverviewRowSection = ({ variant, title, isReverse, children, imageUrl }: IOverviewRowSectionProps) => {
  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12',
        isReverse && 'lg:flex-row-reverse',
      )}
    >
      {/* Content Section */}
      <div
        className={cn(
          'flex flex-col justify-center w-full order-2 lg:order-1',
          variant === 'normal' ? 'lg:flex-1' : 'lg:flex-[4]',
        )}
      >
        <h1
          className={cn(
            'font-semibold text-center lg:text-left',
            variant === 'normal' ? 'text-2xl sm:text-3xl lg:text-3xl' : 'text-3xl sm:text-4xl lg:text-5xl',
          )}
        >
          {title}
        </h1>
        <div className="mt-4 sm:mt-6">{children}</div>
      </div>

      {/* Image Section */}
      <div className={cn('relative w-full order-1 lg:order-2', variant === 'normal' ? 'lg:flex-1' : 'lg:flex-[3]')}>
        <div className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-auto rounded-lg overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export const OverviewRowSectionContent = ({ children }: { children: string }) => {
  return (
    <p className="text-sm sm:text-base leading-6 sm:leading-7 text-slate-500 text-center lg:text-left mb-3 sm:mb-4">
      {children}
    </p>
  );
};

interface IOverviewCardProps {
  icon: ReactNode;
  title: string;
}

export const OverviewCard = ({ icon, title }: IOverviewCardProps) => {
  return (
    <div className="bg-white py-6 sm:py-8 px-4 w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center gap-3 sm:gap-4">
      <div className="w-20 sm:w-24 lg:w-28 xl:w-36 flex-shrink-0">{icon}</div>
      <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-800 leading-tight">{title}</h2>
    </div>
  );
};

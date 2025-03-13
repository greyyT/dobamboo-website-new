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
    <div className={cn('flex items-center gap-12', isReverse && 'flex-row-reverse')}>
      <div className={cn('flex flex-col justify-center', variant === 'normal' ? 'flex-1' : 'flex-[4]')}>
        <h1 className={cn('font-semibold', variant === 'normal' ? 'text-3xl' : 'text-4xl')}>{title}</h1>
        {children}
      </div>
      <div className={cn('relative', variant === 'normal' ? 'flex-1' : 'flex-[3]')}>
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  );
};

export const OverviewRowSectionContent = ({ children }: { children: string }) => {
  return <p className="text-base leading-6 mt-4 text-justify text-slate-500">{children}</p>;
};

interface IOverviewCardProps {
  icon: ReactNode;
  title: string;
}

export const OverviewCard = ({ icon, title }: IOverviewCardProps) => {
  return (
    <div className="bg-white py-6 w-full rounded-md flex flex-col items-center gap-4 drop-shadow-sm">
      {icon}
      <h1 className="text-center text-xl font-semibold">{title}</h1>
    </div>
  );
};

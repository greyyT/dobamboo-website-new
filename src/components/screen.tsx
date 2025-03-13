import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export default function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="flex justify-center px-4">
      <div className={cn('w-full max-w-screen-xl flex flex-col', className)}>{children}</div>
    </div>
  );
}

'use client';

import React, { FC, ReactNode, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface IWillMountProps {
  children: ReactNode;
  mountOn: boolean;
}

const WillMount: FC<IWillMountProps> = ({ children, mountOn }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (mountOn) {
      setIsMounted(true);
    }
  }, [mountOn]);

  if (!mountOn && !isMounted) {
    return null;
  }

  return <div className={cn(!mountOn && isMounted && 'hidden')}>{children}</div>;
};

export default WillMount;

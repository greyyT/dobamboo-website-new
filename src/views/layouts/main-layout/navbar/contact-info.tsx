import { Mail, Phone } from 'lucide-react';
import React, { FC } from 'react';

import { cn } from '@/lib/utils';

const ContactInfo: FC = () => {
  return (
    <div>
      <div className="flex items-center text-title text-[13px]">
        <Phone className="h-[14px]" /> Tel:
        <a
          className={cn(
            'ml-1',
            'bg-gradient-to-r',
            'from-title/50 to-title/50',
            'bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat',
            'transition-[background-size] duration-500',
          )}
          href="callto:+84984323810"
        >
          (+84) 984 323 810
        </a>
      </div>
      <div className="flex items-center text-title text-[13px]">
        <Mail className="h-[14px] mr-[2px]" /> Email:
        <a
          className={cn(
            'ml-1',
            'bg-gradient-to-r',
            'from-title/50 to-title/50',
            'bg-[length:0px_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat',
            'transition-[background-size] duration-500',
          )}
          href="mailto:info.thetrevita@gmail.com"
        >
          info.thetrevita@gmail.com
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;

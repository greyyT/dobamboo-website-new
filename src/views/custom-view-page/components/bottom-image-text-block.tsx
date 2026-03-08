import Image from 'next/image';

import { cn } from '@/lib/utils';
import { BottomImageTextData } from '@/types/custom-view';

interface IBottomImageTextBlockProps {
  data: BottomImageTextData;
}

export default function BottomImageTextBlock({ data }: IBottomImageTextBlockProps) {
  return (
    <div className={cn('relative h-64', !data.image && 'bg-gray-300')}>
      {data.image && <Image src={data.image} alt="" fill className="object-cover" sizes="100vw" />}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <p className="text-white text-2xl font-bold">{data.overlayText}</p>
      </div>
    </div>
  );
}

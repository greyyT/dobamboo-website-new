import Image from 'next/image';

import { cn } from '@/lib/utils';
import { BackgroundTitleData } from '@/types/custom-view';

interface IBackgroundTitleBlockProps {
  data: BackgroundTitleData;
}

export default function BackgroundTitleBlock({ data }: IBackgroundTitleBlockProps) {
  return (
    <div
      className={cn(
        'relative w-full h-96 flex items-center justify-center overflow-hidden',
        !data.backgroundImage && 'bg-gradient-to-br from-green-800 to-green-600',
      )}
    >
      {data.backgroundImage && <Image src={data.backgroundImage} alt="" fill className="object-cover" sizes="100vw" />}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p className="text-xl mt-2">{data.subtitle}</p>
      </div>
    </div>
  );
}

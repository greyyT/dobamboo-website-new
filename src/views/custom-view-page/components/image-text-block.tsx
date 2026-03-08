import Image from 'next/image';

import { cn } from '@/lib/utils';
import { ImageTextBlockData } from '@/types/custom-view';

interface IImageTextBlockProps {
  data: ImageTextBlockData;
}

export default function ImageTextBlock({ data }: IImageTextBlockProps) {
  const imageElement = (
    <div className={cn('relative aspect-square overflow-hidden', !data.image && 'bg-gray-300')}>
      {data.image && (
        <Image src={data.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      )}
    </div>
  );

  const textElement = (
    <div className="flex items-center">
      <p className="whitespace-pre-wrap">{data.text}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.imagePosition === 'left' ? (
        <>
          {imageElement}
          {textElement}
        </>
      ) : (
        <>
          {textElement}
          {imageElement}
        </>
      )}
    </div>
  );
}

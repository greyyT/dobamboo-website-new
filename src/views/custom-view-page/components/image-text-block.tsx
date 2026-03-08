import Image from 'next/image';

import { ImageTextBlockData } from '@/types/custom-view';

interface IImageTextBlockProps {
  data: ImageTextBlockData;
}

export default function ImageTextBlock({ data }: IImageTextBlockProps) {
  const imageElement = (
    <div className="relative aspect-square overflow-hidden">
      <Image src={data.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
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

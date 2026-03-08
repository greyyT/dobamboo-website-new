import Image from 'next/image';

import { IconTextRowData } from '@/types/custom-view';

interface IIconTextRowBlockProps {
  data: IconTextRowData;
}

export default function IconTextRowBlock({ data }: IIconTextRowBlockProps) {
  if (!data.items || data.items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.items.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center p-4">
          <div className="relative w-16 h-16">
            {item.icon ? (
              <Image src={item.icon} alt="" fill className="object-cover" sizes="64px" />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded" />
            )}
          </div>
          <p className="mt-2 text-center">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

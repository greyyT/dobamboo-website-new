import { TextBlockData } from '@/types/custom-view';

interface ITextBlockProps {
  data: TextBlockData;
}

export default function TextBlock({ data }: ITextBlockProps) {
  return (
    <div className="p-6">
      <p className="whitespace-pre-wrap">{data.text}</p>
    </div>
  );
}

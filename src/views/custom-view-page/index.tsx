import { Language } from '@prisma/client';

import Intl from '@/constants/intl';
import {
  BackgroundTitleData,
  BottomImageTextData,
  CustomLayoutItemType,
  CustomViewResponse,
  IconTextRowData,
  ImageTextBlockData,
  TextBlockData,
} from '@/types/custom-view';

import BackgroundTitleBlock from './components/background-title-block';
import BottomImageTextBlock from './components/bottom-image-text-block';
import IconTextRowBlock from './components/icon-text-row-block';
import ImageTextBlock from './components/image-text-block';
import TextBlock from './components/text-block';

interface ICustomViewPageProps {
  customView: CustomViewResponse;
  locale: Intl;
}

export default async function CustomViewPage({ customView, locale }: ICustomViewPageProps) {
  const language = locale.toUpperCase() as Language;

  return (
    <main>
      {customView.items.map(item => {
        const translation = item.translations.find(t => t.locale === language) ?? item.translations[0];
        const data = translation?.data;

        switch (item.type) {
          case CustomLayoutItemType.BACKGROUND_TITLE:
            return (
              <BackgroundTitleBlock
                key={item.id}
                data={(data ?? { title: '', subtitle: '', backgroundImage: '' }) as BackgroundTitleData}
              />
            );
          case CustomLayoutItemType.IMAGE_TEXT_BLOCK:
            return (
              <ImageTextBlock
                key={item.id}
                data={(data ?? { image: '', text: '', imagePosition: 'left' }) as ImageTextBlockData}
              />
            );
          case CustomLayoutItemType.ICON_TEXT_ROW:
            return <IconTextRowBlock key={item.id} data={(data ?? { items: [] }) as IconTextRowData} />;
          case CustomLayoutItemType.BOTTOM_IMAGE_TEXT:
            return (
              <BottomImageTextBlock
                key={item.id}
                data={(data ?? { image: '', overlayText: '' }) as BottomImageTextData}
              />
            );
          case CustomLayoutItemType.TEXT_BLOCK:
            return <TextBlock key={item.id} data={(data ?? { text: '' }) as TextBlockData} />;
          default:
            return null;
        }
      })}
    </main>
  );
}

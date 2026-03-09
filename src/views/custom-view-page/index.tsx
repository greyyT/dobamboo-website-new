import { Language } from '@prisma/client';

import Screen from '@/components/screen';
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
    <main className="mt-4">
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
          case CustomLayoutItemType.BOTTOM_IMAGE_TEXT:
            return (
              <BottomImageTextBlock
                key={item.id}
                data={(data ?? { image: '', overlayText: '' }) as BottomImageTextData}
              />
            );
          case CustomLayoutItemType.IMAGE_TEXT_BLOCK:
            return (
              <Screen key={item.id} className="py-6 sm:py-8">
                <ImageTextBlock data={(data ?? { image: '', text: '', imagePosition: 'left' }) as ImageTextBlockData} />
              </Screen>
            );
          case CustomLayoutItemType.ICON_TEXT_ROW:
            return (
              <Screen key={item.id} className="py-6 sm:py-8">
                <IconTextRowBlock data={(data ?? { items: [] }) as IconTextRowData} />
              </Screen>
            );
          case CustomLayoutItemType.TEXT_BLOCK:
            return (
              <Screen key={item.id} className="py-6 sm:py-8">
                <TextBlock data={(data ?? { text: '' }) as TextBlockData} />
              </Screen>
            );
          default:
            return null;
        }
      })}
    </main>
  );
}

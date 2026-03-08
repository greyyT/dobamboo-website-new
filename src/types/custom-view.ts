import { Language } from '@prisma/client';

export enum CustomLayoutItemType {
  BACKGROUND_TITLE = 'BACKGROUND_TITLE',
  IMAGE_TEXT_BLOCK = 'IMAGE_TEXT_BLOCK',
  ICON_TEXT_ROW = 'ICON_TEXT_ROW',
  BOTTOM_IMAGE_TEXT = 'BOTTOM_IMAGE_TEXT',
  TEXT_BLOCK = 'TEXT_BLOCK',
}

export interface BackgroundTitleData {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export interface ImageTextBlockData {
  image: string;
  text: string;
  imagePosition: 'left' | 'right';
}

export interface IconTextRowData {
  items: Array<{ icon: string; text: string }>;
}

export interface BottomImageTextData {
  image: string;
  overlayText: string;
}

export interface TextBlockData {
  text: string;
}

export type CustomLayoutItemData =
  | BackgroundTitleData
  | ImageTextBlockData
  | IconTextRowData
  | BottomImageTextData
  | TextBlockData;

export interface CustomLayoutItemTranslation {
  id: string;
  locale: Language;
  data: CustomLayoutItemData;
}

export interface CustomLayoutItem {
  id: string;
  type: CustomLayoutItemType;
  order: number;
  translations: CustomLayoutItemTranslation[];
}

export interface CustomViewResponse {
  id: string;
  slug: string;
  items: CustomLayoutItem[];
  createdAt: string;
  updatedAt: string;
}

import { DEFAULT_ITEMS_PER_PAGE } from './pagination';

export enum QueryParams {
  OFFSET = 'offset',
  LIMIT = 'limit',

  PAGE = 'p',
  PAGE_SIZE = 'ps',
  SEARCH = 'q',

  CATEGORY_ID = 'categoryId',
  LOCALE = 'locale',
  REVALIDATE_PATH = 'revalidatePath',
}

export const DEFAULT_OFFSET = 0;
export const DEFAULT_LIMIT = DEFAULT_ITEMS_PER_PAGE;

export enum AboutUsSearchParams {
  Tab = 't',
}

export enum AboutUsTabKey {
  Overview = 'overview',
  OurStory = 'our-story',
}

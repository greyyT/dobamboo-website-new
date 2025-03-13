import { QueryParams } from '@/constants/query-params';

export type PaginationProps = {
  [QueryParams.OFFSET]?: number | string | null;
  [QueryParams.LIMIT]?: number | string | null;
  [QueryParams.SEARCH]?: string | null;
};

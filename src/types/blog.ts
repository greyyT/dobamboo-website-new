import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

enum BlogPropertyType {
  STATUS = 'status',
  DATE = 'date',
  RICHTEXT = 'rich_text',
  URL = 'url',
  TITLE = 'title',
}

enum BlogStatus {
  PUBLISHED = 'Published',
}

export type BlogResponse = PageObjectResponse & {
  properties: {
    Status: {
      id: string;
      type: BlogPropertyType;
      status: {
        id: string;
        name: BlogStatus;
        color: string;
      };
    };
    Date: {
      id: string;
      type: BlogPropertyType;
      date: {
        start: string | null;
        end: string | null;
        time_zone: string | null;
      };
    };
    Slug: {
      id: string;
      type: BlogPropertyType;
      rich_text: {
        type: 'text';
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }[];
    };
    CoverImage: {
      id: string;
      type: BlogPropertyType;
      url: string | null;
    };
    Title: {
      id: string;
      type: BlogPropertyType;
      title: {
        type: 'text';
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }[];
    };
    Description: {
      id: string;
      type: BlogPropertyType;
      rich_text: {
        type: 'text';
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }[];
    };
  };
};

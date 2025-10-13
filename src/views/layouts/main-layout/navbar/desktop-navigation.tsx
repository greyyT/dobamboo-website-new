'use-client';

import { Category, View } from '@prisma/client';
import { useTranslations } from 'next-intl';

import WillRender from '@/components/will-render';
import { NAVBAR_ITEMS } from '@/constants/navbar';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { CategoryWithSubcategories } from '@/types/category';
import { getIntlFormat } from '@/utils/formatter';

interface IDesktopNavigationProps {
  categories: CategoryWithSubcategories[];
}

export default function DesktopNavigation({ categories }: IDesktopNavigationProps) {
  const tDefault = useTranslations('Default');
  const tCategory = useTranslations(View.CATEGORY);

  const categoriesHaveIntl = categories.reduce<CategoryWithSubcategories[]>((acc, cur) => {
    if (!tCategory.has(getIntlFormat(cur.id, 'name'))) {
      return acc;
    }

    if (cur.children.length > 0) {
      const children: Category[] = [];
      cur.children.forEach(subcategory => {
        if (tCategory.has(getIntlFormat(subcategory.id, 'name'))) {
          children.push(subcategory);
        }
      });
      acc.push({ ...cur, children });
    } else {
      acc.push(cur);
    }

    return acc;
  }, []);

  return (
    <div className="flex gap-2 lg:gap-4">
      {NAVBAR_ITEMS.map(item => (
        <div key={item.href}>
          <Link
            href={item.href}
            className={cn(
              'block relative text-title text-sm font-semibold uppercase tracking-[3px] leading-8 px-2.5 py-1 peer hover:bg-title/5 rounded-md transition-colors',
              item.title === 'product' &&
                'after:absolute after:-bottom-5 after:h-10 after:-left-3 after:-right-3 after:block',
            )}
          >
            {tDefault(getIntlFormat('navbar', item.title))}
          </Link>
          {item.title === 'product' && (
            <ul className="absolute hidden peer-hover:grid hover:grid top-full left-0 right-0 z-20 bg-white drop-shadow-lg grid-cols-5 px-4 py-6 gap-7">
              {categoriesHaveIntl.map(category => (
                <li key={category.id}>
                  <Link
                    className="text-sm uppercase font-semibold text-subtitle block mb-4"
                    href={`/product/${category.slug}`}
                  >
                    {tCategory(getIntlFormat(category.id, 'name'))}
                  </Link>
                  <WillRender when={category.children.length > 0}>
                    <ul>
                      {category.children.map(subcategory => (
                        <li key={subcategory.id}>
                          <Link
                            className="block py-[5px] text-sm text-title hover:text-[#363636] hover:font-medium"
                            href={`/product/${category.slug}/${subcategory.slug}`}
                          >
                            {tCategory(getIntlFormat(subcategory.id, 'name'))}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </WillRender>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

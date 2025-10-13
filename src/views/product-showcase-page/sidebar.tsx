import { Category, View } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Route } from '@/constants/route';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { CategoryWithSubcategories } from '@/types/category';
import { getIntlFormat } from '@/utils/formatter';

interface ISidebarProps {
  activeCategory: Category | null;
  activeSubCategory: Category | null;
  categories: CategoryWithSubcategories[] | null;
}

const Sidebar = async ({ activeCategory, activeSubCategory, categories = [] }: ISidebarProps) => {
  const t = await getTranslations(View.CATEGORY);

  // Filter categories that have translations
  const categoriesHaveIntl =
    categories?.reduce<CategoryWithSubcategories[]>((acc, cur) => {
      if (!t.has(getIntlFormat(cur.id, 'name'))) {
        return acc;
      }

      if (cur.children && cur.children.length > 0) {
        // Filter subcategories that have translations
        const children = cur.children.filter(subcategory => t.has(getIntlFormat(subcategory.id, 'name')));
        acc.push({ ...cur, children });
      } else {
        acc.push(cur);
      }

      return acc;
    }, []) || [];

  return (
    <aside className="w-full lg:w-80">
      <div className="bg-white lg:bg-transparent border lg:border-0 rounded-lg lg:rounded-none shadow-sm lg:shadow-none">
        <Link
          href={Route.PRODUCT}
          className="block w-full bg-slate-500/10 hover:bg-slate-500/15 transition-colors uppercase px-4 py-3 lg:pb-1 lg:pt-2 font-semibold tracking-[1.5px] text-slate-500 text-sm"
        >
          Product
        </Link>

        <div className="max-h-96 lg:max-h-none overflow-y-auto lg:overflow-visible">
          <ul className="px-4 py-2 lg:pl-4 lg:pt-[10px] lg:py-0">
            {categoriesHaveIntl.map(category => (
              <li key={category.id} className="border-b lg:border-0 border-gray-100 last:border-0">
                <Link
                  className={cn(
                    'block text-sm lg:text-[13px] text-subtitle leading-5 py-3 lg:py-1 hover:text-active-breadcrumb transition-colors',
                    activeCategory?.id === category.id && 'text-active-breadcrumb font-bold',
                  )}
                  href={`${Route.PRODUCT}/${category.slug}`}
                >
                  {t(getIntlFormat(category.id, 'name'))}
                </Link>
                {activeCategory?.id === category.id && category.children && category.children.length > 0 && (
                  <ul className="pl-4 lg:pl-4 pb-2 lg:pb-0">
                    {category.children.map(subCategory => (
                      <li key={subCategory.id}>
                        <Link
                          className={cn(
                            'block text-sm lg:text-[13px] text-subtitle leading-5 py-2 lg:py-1 hover:text-active-breadcrumb transition-colors',
                            activeSubCategory?.id === subCategory.id && 'text-active-breadcrumb font-bold',
                          )}
                          href={`${Route.PRODUCT}/${category.slug}/${subCategory.slug}`}
                        >
                          {t(getIntlFormat(subCategory.id, 'name'))}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

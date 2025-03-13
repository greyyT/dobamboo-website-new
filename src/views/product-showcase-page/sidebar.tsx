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

  return (
    <aside className="flex-1">
      <div>
        <Link
          href={Route.PRODUCT}
          className="block w-full bg-slate-500/10 uppercase px-4 pb-1 pt-2 font-semibold tracking-[1.5px] text-slate-500 text-sm"
        >
          Product
        </Link>
        <ul className="pl-4 pt-[10px]">
          {categories &&
            categories.map(category => (
              <li key={category.id}>
                <Link
                  className={cn(
                    'block text-[13px] text-subtitle leading-5 py-1',
                    activeCategory?.id === category.id && 'text-active-breadcrumb font-bold',
                  )}
                  href={`${Route.PRODUCT}/${category.slug}`}
                >
                  {t(getIntlFormat(category.id, 'name'))}
                </Link>
                {activeCategory?.id === category.id && category.children && (
                  <ul className="pl-4">
                    {category.children.map(subCategory => (
                      <li key={subCategory.id}>
                        <Link
                          className={cn(
                            'block text-[13px] text-subtitle leading-5 py-1',
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
    </aside>
  );
};

export default Sidebar;

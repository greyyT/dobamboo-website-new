import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Route } from '@/constants/route';
import { Link } from '@/i18n/navigation';
import { getIntlFormat } from '@/utils/formatter';

export default async function Footer() {
  const t = await getTranslations('Default');

  return (
    <footer className="mt-10 pb-10 bg-main-bg pt-6 flex flex-col items-center px-4">
      <ul className="flex flex-col sm:grid sm:grid-cols-3 w-300 max-w-full lg:px-4 gap-y-4">
        <li>
          <h4 className="uppercase text-[15px] text-subtitle leading-6 font-semibold tracking-[0.5px]">
            {t(getIntlFormat('footer', 'aboutSection'))}
          </h4>
          <Link href={Route.ABOUT_US} className="text-sm text-[#0e1112] block">
            {t(getIntlFormat('footer', 'aboutUs'))}
          </Link>
          <Link href={Route.OUR_STORY} className="text-sm text-[#0e1112] block">
            {t(getIntlFormat('footer', 'ourStory'))}
          </Link>
          <Link href={Route.MEET_THE_TEAM} className="text-sm text-[#0e1112] block">
            {t(getIntlFormat('footer', 'meetTheTeam'))}
          </Link>
        </li>
        <li>
          <h4 className="uppercase text-[15px] text-subtitle leading-6 font-semibold tracking-[0.5px]">
            {t(getIntlFormat('footer', 'contactSection'))}
          </h4>
          <Link href={Route.CAREER} className="text-sm text-[#0e1112] block">
            {t(getIntlFormat('footer', 'careers'))}
          </Link>
          <Link href={Route.CONTACT} className="text-sm text-[#0e1112] block">
            {t(getIntlFormat('footer', 'contactUs'))}
          </Link>
          <Link href={Route.BLOG} className="text-sm text-[#0e1112] block">
            {t(getIntlFormat('footer', 'blog'))}
          </Link>
        </li>
        <li>
          <h4 className="uppercase text-[15px] text-subtitle leading-6 font-semibold tracking-[0.5px]">
            {t(getIntlFormat('footer', 'followUsOn'))}
          </h4>
          <div className="flex gap-6 mt-5">
            <Link
              href="https://www.facebook.com/share/1CeQkbgWMM/?mibextid=wwXIfr"
              className="h-10 block relative"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/images/facebook.png" alt={t(getIntlFormat('footer', 'facebook'))} width={30} height={30} />
            </Link>
            <Link
              href="https://www.pinterest.com/infothetrevita/"
              className="h-10 block relative"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/images/pinterest.png" alt={t(getIntlFormat('footer', 'pinterest'))} width={30} height={30} />
            </Link>
            <Link
              href="https://www.instagram.com/the.trevita/?igsh=d2JwcDB1Nm5rNjh3&utm_source=qr"
              className="h-10 block relative"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/images/instagram.png" alt={t(getIntlFormat('footer', 'instagram'))} width={30} height={30} />
            </Link>

            <Link
              href="https://www.linkedin.com/company/the-tre-vita-mfg-trading-co-ltd/"
              className="h-10 block relative"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-7.5 h-7.5 bg-slate-600/80">
                <Image src="/images/linkedin.png" alt={t(getIntlFormat('footer', 'linkedin'))} width={30} height={30} />
              </div>
            </Link>
          </div>
        </li>
      </ul>
    </footer>
  );
}

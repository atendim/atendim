import { Container } from '@/components/container';
import { buttonVariants } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Fragment } from 'react';
import { LandingPageNavBar } from './_components/landing-page-nav-bar';

export default async function MarketingPage() {
  const locale = await getLocale();
  const t = await getTranslations('MarketingPage');
  return (
    <Container>
      <LandingPageNavBar />
      <div className='flex flex-col content-center items-center gap-10 py-20'>
        <h1 className='text-center text-5xl font-bold tracking-tight text-gray-800 sm:text-6xl'>
          {t('hero.title.prefix')}{' '}
          <span className='text-primary'>{t('hero.title.span')}</span>{' '}
          {t('hero.title.suffix')}
        </h1>
        <p className='text-md text-center text-gray-600'>
          {t('hero.description')}
        </p>
        <Link href={`${locale}/sign-in`} className={buttonVariants()}>
          <Fragment>
            {t('hero.button.text')}
            <ChevronRight />
          </Fragment>
        </Link>
      </div>
    </Container>
  );
}

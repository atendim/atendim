import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';
import NavBar from './_components/nav-bar';

export default async function MarketingPage() {
  const t = await getTranslations('MarketingPage');
  return (
    <main className='mx-auto w-full max-w-screen-xl px-5 md:px-20'>
      <NavBar />
      <div className='flex flex-col content-center items-center gap-10 py-20'>
        <h1 className='text-center text-5xl font-bold tracking-tight text-gray-800 sm:text-6xl'>
          {t('hero.title.prefix')}{' '}
          <span className='text-primary'>{t('hero.title.span')}</span>{' '}
          {t('hero.title.suffix')}
        </h1>
        <p className='text-md text-center text-gray-600'>
          {t('hero.description')}
        </p>
        <Button>
          <Fragment>
            {t('hero.button.text')}
            <ChevronRight />
          </Fragment>
        </Button>
      </div>
    </main>
  );
}

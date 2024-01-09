import { Container } from '@/components/container';
import { Icons } from '@/components/icons';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Form } from './_components/form';

async function SignInPage() {
  const t = await getTranslations('Auth');
  return (
    <Container>
      <div className='flex items-center justify-center py-12'>
        <Link href={'/'}>
          <Icons.Logo className='w-48' />
        </Link>
      </div>
      <section className='mx-auto flex flex-col gap-4 px-8 md:max-w-screen-sm'>
        <Form />
        <Link
          href='/'
          className={
            'flex items-center gap-1 text-xs text-blue-500 hover:underline'
          }
        >
          {t('alreadyHasAnAccount')}
          {` `}
          {t('signin')}
          <ArrowRight size={14} />
        </Link>
      </section>
    </Container>
  );
}

export default SignInPage;

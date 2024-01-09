import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { SignInForm } from './_components/form';

async function SignInPage() {
  const t = await getTranslations('Auth');
  return (
    <section className='mx-auto flex flex-col gap-4 sm:px-8 md:max-w-[70%] lg:max-w-[50%] '>
      <SignInForm />
      <Link
        href='/sign-up'
        className={
          'flex items-center gap-1 text-xs text-blue-500 hover:underline'
        }
      >
        {`${t('dontHaveAnAccount')} ${t('signup')}`}
        <ArrowRight size={14} />
      </Link>
    </section>
  );
}

export default SignInPage;

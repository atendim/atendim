import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { SignInForm } from './_components/sign-in-form';

async function SignInPage() {
  const t = await getTranslations('Auth');

  return (
    <>
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
    </>
  );
}

export default SignInPage;

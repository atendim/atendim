import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { SignUpForm } from './_components/sign-up-form';

async function SignUpPage() {
  const t = await getTranslations('Auth');

  return (
    <>
      <SignUpForm />
      <Link
        href='/sign-in'
        className={
          'flex items-center gap-1 text-xs text-blue-500 hover:underline'
        }
      >
        {`${t('alreadyHasAnAccount')} ${t('signin')}`}
        <ArrowRight size={14} />
      </Link>
    </>
  );
}

export default SignUpPage;

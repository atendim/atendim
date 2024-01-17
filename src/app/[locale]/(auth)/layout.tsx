import { Container } from '@/components/container';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Container>
      <div className='flex items-center justify-center py-14'>
        <Link href={'/'}>
          <Icons.Logo className='w-48' />
        </Link>
      </div>
      <section className='mx-auto flex flex-col gap-4 sm:px-8 md:max-w-[70%] lg:max-w-[50%] '>
        {children}
      </section>
    </Container>
  );
}

export default AuthLayout;

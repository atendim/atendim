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
      {children}
    </Container>
  );
}

export default AuthLayout;

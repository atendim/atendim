'use client';
import { NavBar } from '@/components/nav-bar';

export function LandingPageNavBar() {
  return (
    <NavBar.Root className='[&>*:last-child]:left-auto [&>*:last-child]:right-0 [&>*:last-child]:top-[70%]'>
      <NavBar.List>
        <NavBar.Logo />
        <NavBar.LanguageSwitcher />
      </NavBar.List>
    </NavBar.Root>
  );
}

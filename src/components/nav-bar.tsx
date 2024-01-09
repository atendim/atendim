'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { localeNames, locales } from '@/i18n';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Languages } from 'lucide-react';
import Link from 'next/link';
import { Icons } from './icons';
import { navigationMenuTriggerStyle } from './ui/navigation-menu';

const Logo = () => {
  return (
    <NavigationMenuItem>
      <Link href='/'>
        <Icons.Logo className='w-24' />
      </Link>
    </NavigationMenuItem>
  );
};

const LanguageSwitcher = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Languages size={16} className='text-gray-600' />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='gap-1.2 flex flex-col'>
          {locales.map(locale => (
            <li key={locale} className='w-full'>
              <Link
                href={`/${locale}`}
                legacyBehavior
                passHref
                className='w-full'
              >
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'w-full gap-2 px-2'
                  )}
                >
                  {localeNames[locale]}
                  <ArrowUpRight size={16} />
                </NavigationMenuLink>
              </Link>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const Root = ({
  children,
  className
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <NavigationMenu
      className={cn('w-full py-6 [&>*:first-child]:w-full', className)}
    >
      {children}
    </NavigationMenu>
  );
};

const List = ({
  children,
  className
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <NavigationMenuList className={cn('justify-between', className)}>
      {children}
    </NavigationMenuList>
  );
};

const NavBar = () => {
  return (
    <Root>
      <List>
        <Logo />
      </List>
    </Root>
  );
};

NavBar.Root = Root;
NavBar.List = List;
NavBar.Logo = Logo;
NavBar.LanguageSwitcher = LanguageSwitcher;

export { NavBar };

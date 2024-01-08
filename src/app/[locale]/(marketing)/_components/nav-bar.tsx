'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { localeNames, locales } from '@/i18n';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Languages } from 'lucide-react';
import Link from 'next/link';

function NavBar() {
  return (
    <NavigationMenu className='w-full py-6 [&>*:first-child]:w-full [&>*:last-child]:left-auto [&>*:last-child]:right-0 [&>*:last-child]:top-[70%]'>
      <NavigationMenuList className='justify-between'>
        <NavigationMenuItem>
          <Link href='/'>Atendim</Link>
        </NavigationMenuItem>
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavBar;

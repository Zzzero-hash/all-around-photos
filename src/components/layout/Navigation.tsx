'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Navigation({
  items,
  className,
  itemClassName,
  activeClassName,
  orientation = 'horizontal',
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row space-x-6' : 'flex-col space-y-2',
        className
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'font-medium transition-colors relative group',
              'text-neutral-700 hover:text-primary-600',
              isActive && 'text-primary-600',
              itemClassName,
              isActive && activeClassName
            )}
          >
            {item.name}
            {orientation === 'horizontal' && (
              <span
                className={cn(
                  'absolute -bottom-1 left-0 h-0.5 bg-primary-600 transition-all',
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                )}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
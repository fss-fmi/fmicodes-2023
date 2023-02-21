'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export interface FancyLinkProps {
  href: string;
  isPrimary?: boolean;
  isBlock?: boolean;
  children: ReactNode;
}

export function FancyLink(props: FancyLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={props.href}
      className={
        (props.isPrimary ? ' bg-blue-700 text-white' : '') +
        (props.href === pathname
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white') +
        (props.isBlock ? ' block w-full' : '') +
        ' px-3 py-2 rounded-md text-sm font-medium'
      }
      aria-current={props.href === pathname ? 'page' : undefined}
    >
      {props.children}
    </Link>
  );
}

export default FancyLink;
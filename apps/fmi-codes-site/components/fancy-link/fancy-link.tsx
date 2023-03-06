'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export interface FancyLinkProps {
  href: string;
  isPrimary?: boolean;
  isBlock?: boolean;
  target?: string;
  children: ReactNode;
}

export function FancyLink(props: FancyLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={props.href}
      target={props.target}
      className={
        (props.isPrimary ? ' bg-red-600 hover:bg-red-700 text-white' : '') +
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

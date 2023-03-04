'use client';

import { Disclosure, Transition } from '@headlessui/react';
import React, { FC, Fragment } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NavbarProfile from '../navbar-profile/navbar-profile';
import Link from 'next/link';
import Image from 'next/image';
import fmiCodesLogo from '../../public/images/fmi-codes-logo-256x256.png';
import FancyLink from '../fancy-link/fancy-link';
import { SessionProvider } from 'next-auth/react';

const navigation = [
  { name: 'За хакатона', href: '/about' },
  { name: 'Програма', href: '/schedule' },
  { name: 'Регламент', href: '/regulation' },
  { name: 'Отбори', href: '/teams' },
  // { name: 'Ментори', href: '/mentors' },
  // { name: 'Класация', href: '/ranking' },
  // { name: 'Архив', href: '/archive' },
];

const Navbar: FC = () => {
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 acrylic">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-5xl px-2">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button*/}
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Отваряне на главното меню</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      className="block h-16 w-auto"
                      src={fmiCodesLogo}
                      alt="FMI{Codes} Logo"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
                <div className="hidden lg:ml-4 lg:flex items-center space-x-2">
                  {navigation.map((item) => (
                    <FancyLink key={item.name} href={item.href}>
                      {item.name}
                    </FancyLink>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                {/* Profile dropdown */}
                <SessionProvider>
                  <NavbarProfile />
                </SessionProvider>
              </div>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button key={item.name} className="block w-full">
                    {({ open }) => (
                      <FancyLink href={item.href} isBlock>
                        {item.name}
                      </FancyLink>
                    )}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

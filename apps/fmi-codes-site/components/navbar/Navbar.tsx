'use client';
import { Disclosure, Transition } from '@headlessui/react';
import React, { FC, Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NavbarProfile from '../navbar-profile/navbar-profile';
import Link from 'next/link';
import Image from 'next/image';
import fmiCodesLogo from '../../public/images/fmi-codes-logo-60x60.jpg';
import styles from './Navbar.module.scss';

const navigation = [
  { name: 'За хакатона', href: '/about' },
  { name: 'Програма', href: '/schedule' },
  { name: 'Регламент', href: '/regulation' },
  { name: 'Отбори', href: '/teams' },
  { name: 'Ментори', href: '/mentors' },
  { name: 'Класация', href: '/ranking' },
  { name: 'Архив', href: '/archive' },
];

const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className={styles.container}>
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
                      className="block h-8 w-auto"
                      src={fmiCodesLogo}
                      alt="FMI{Codes} Logo"
                      width={60}
                      height={60}
                    />
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={
                          (item.href === pathname
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white') +
                          ' px-3 py-2 rounded-md text-sm font-medium'
                        }
                        aria-current={
                          item.href === pathname ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                {/* Profile dropdown */}
                <NavbarProfile />
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
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={
                      (item.href === pathname
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white') +
                      ' block px-3 py-2 rounded-md text-base font-medium'
                    }
                    aria-current={item.href === pathname ? 'page' : undefined}
                  >
                    {item.name}
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

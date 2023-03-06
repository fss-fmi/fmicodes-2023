'use client';

import FancyButton from '../../../components/fancy-button/fancy-button';
import { ReactNode } from 'react';
import { signOut } from 'next-auth/react';
import FancyHeading from '../../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/logout" page.
 * @return {ReactNode} Logout page component.
 * @constructor
 */
export default function LogoutPage(): ReactNode {
  return (
    <>
      <FancyHeading title="Изход" />
      <div className="h-2/3 grid place-items-center">
        <div className="w-full acrylic rounded-lg md:mt-0 sm:max-w-6xl xl:p-0">
          <div className="p-6 space-y-2 sm:p-8">
            <h3 className="text-xl font-bold md:text-2xl text-white">
              Наистина ли искате да излезете?
            </h3>
            <p>Ще бъдете пренасочени към началната страница на хакатона.</p>
          </div>
          <div className="flex items-center justify-end p-4 space-x-4">
            <FancyButton
              isPrimary
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Изход
            </FancyButton>
          </div>
        </div>
      </div>
    </>
  );
}

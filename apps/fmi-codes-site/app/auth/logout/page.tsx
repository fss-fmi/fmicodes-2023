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
    <div>
      <FancyHeading title="Изход" />
      <FancyButton isPrimary onClick={() => signOut()}>
        Изход
      </FancyButton>
    </div>
  );
}

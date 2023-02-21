'use client';

import { ReactNode } from 'react';
import { signOut } from 'next-auth/react';
import FancyButton from '../../../components/fancy-button/fancy-button';

interface Props {
  callbackUrl: string;
}

/**
 * Defines the "/logout" page.
 * @return {ReactNode} Logout page component.
 * @constructor
 */
export default function LogoutPage(props: Props): ReactNode {
  return (
    <div>
      <FancyButton
        isPrimary
        onClick={() => signOut({ callbackUrl: props.callbackUrl })}
      >
        Изход
      </FancyButton>
    </div>
  );
}

'use client';

import { ReactNode } from 'react';
import { signOut } from 'next-auth/react';

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
      <button
        onClick={() => signOut({ callbackUrl: props.callbackUrl ?? '/' })}
      >
        Sign out
      </button>
    </div>
  );
}

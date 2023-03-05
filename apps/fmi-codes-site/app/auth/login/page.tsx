import { ReactNode } from 'react';
import LoginForm from '../../../components/login-form/login-form';
import FancyHeading from '../../../components/fancy-heading/fancy-heading';
import { getServerSession } from 'next-auth';
import { getUserBySession } from '../../../pages/api/users/self';
import { redirect } from 'next/navigation';

/**
 * Defines the "/login" page.
 * @return {ReactNode} Login page component.
 * @constructor
 */
export default async function LoginPage({ searchParams }): Promise<ReactNode> {
  const session = await getServerSession();
  const user = await getUserBySession(session);

  if (user) {
    redirect('/');
    return;
  }

  return (
    <>
      <FancyHeading title="Вход" />
      <div className="h-2/3 grid place-items-center">
        <LoginForm error={searchParams.error} />
      </div>
    </>
  );
}

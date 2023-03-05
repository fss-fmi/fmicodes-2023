import { ReactNode } from 'react';
import LoginForm from '../../../components/login-form/login-form';
import FancyHeading from '../../../components/fancy-heading/fancy-heading';
import { getServerSession } from 'next-auth';
import { getUserBySession } from '../../../pages/api/users/self';
import { useRouter } from 'next/navigation';

/**
 * Defines the "/login" page.
 * @return {ReactNode} Login page component.
 * @constructor
 */
export default async function LoginPage({ searchParams }): Promise<ReactNode> {
  const router = useRouter();
  const session = await getServerSession();
  const user = await getUserBySession(session);

  if (!user) {
    router.push('/');
    return;
  }

  return (
    <div className="login-page">
      <FancyHeading title="Вход" />
      <div className="grid place-items-center h-screen">
        <LoginForm error={searchParams.error} />
      </div>
    </div>
  );
}

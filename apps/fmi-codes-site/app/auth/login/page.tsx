import { ReactNode } from 'react';
import LoginForm from '../../../components/login-form/login-form';
import FancyHeading from '../../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/login" page.
 * @return {ReactNode} Login page component.
 * @constructor
 */
export default function LoginPage({ searchParams }): ReactNode {
  return (
    <div className="login-page">
      <FancyHeading title="Вход" />
      <div className="grid place-items-center h-screen">
        <LoginForm error={searchParams.error} />
      </div>
    </div>
  );
}

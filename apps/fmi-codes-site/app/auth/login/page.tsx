import { ReactNode } from 'react';
import LoginForm from '../../../components/login-form/login-form';

/**
 * Defines the "/login" page.
 * @return {ReactNode} Login page component.
 * @constructor
 */
export default function LoginPage({ searchParams }): ReactNode {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="grid place-items-center h-screen">
        <LoginForm error={searchParams.error} />
      </div>
    </div>
  );
}

import { ReactNode } from 'react';
import RegistrationForm from '../../../components/registration-form/registration-form';

/**
 * Defines the "/register" page.
 * @return {ReactNode} Register page component.
 * @constructor
 */
export default function RegisterPage(): ReactNode {
  return (
    <div className="register-page">
      <div className="grid place-items-center">
        <RegistrationForm />
      </div>
    </div>
  );
}

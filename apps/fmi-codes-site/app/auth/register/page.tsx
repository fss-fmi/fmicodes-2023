import { ReactNode } from 'react';
import RegistrationForm from '../../../components/registration-form/registration-form';
import prisma from '../../../lib/prismadb';

/**
 * Defines the "/register" page.
 * @return {ReactNode} Register page component.
 * @constructor
 */
export default async function RegisterPage(): Promise<ReactNode> {
  const technologies = await prisma.technology.findMany();

  return (
    <div className="register-page">
      <div className="grid place-items-center">
        <RegistrationForm technologies={technologies} />
      </div>
    </div>
  );
}

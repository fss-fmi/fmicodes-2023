import { ReactNode } from 'react';
import RegistrationForm from '../../../components/registration-form/registration-form';
import prisma from '../../../lib/prismadb';
import FancyHeading from '../../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/register" page.
 * @return {ReactNode} Register page component.
 * @constructor
 */
export default async function RegisterPage(): Promise<ReactNode> {
  const technologies = await prisma.technology.findMany();

  return (
    <div className="register-page">
      <FancyHeading title="Регистрация" />
      <div className="grid place-items-center">
        <RegistrationForm technologies={technologies} />
      </div>
    </div>
  );
}

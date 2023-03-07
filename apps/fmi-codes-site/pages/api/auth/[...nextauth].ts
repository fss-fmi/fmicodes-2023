import NextAuth, { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { comparePasswords } from '../../../lib/password';
import prisma from '../../../lib/prismadb';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, request) => {
        if (!credentials || !credentials.email || !credentials.password) {
          // throw create Error('Моля, попълнете всички полета.');
          throw new Error('Please fill all fields.');
        }

        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !(await comparePasswords(password, user.passwordHash))) {
          // throw create Error('Невалиден имейл адрес или парола.');
          throw new Error('Invalid email address or password.');
        }

        if (!user.emailVerifiedDate) {
          // throw create Error(
          //   // 'Имейл адресът не е потвърден. Моля, проверете пощата си.' TODO: Find a way to return message in cyrillic
          //   'Email address is not verified. Please check your email for instructions on verifying.'
          // );
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          // TODO: Add image
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    error: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);

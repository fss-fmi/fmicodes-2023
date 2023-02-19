import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prismadb';
import { comparePasswords } from '../../../lib/password';

export default NextAuth({
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
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error('No user found');
        }

        if (!(await comparePasswords(password, user.passwordHash))) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          // TODO: Add image
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
  },
  secret: process.env.SECRET,
  session: { strategy: 'jwt' },
});

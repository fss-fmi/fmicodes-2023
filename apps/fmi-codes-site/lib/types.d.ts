import { Team, User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'passwordHash'>;
export type UserWithoutPasswordWithJoins =
  Partial<UserWithoutPasswordAndDates> & {
    teamCaptain: Team | null;
  };

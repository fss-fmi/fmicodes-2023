import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { getUserBySession } from '../../../pages/api/users/self';
import FancyHeading from '../../../components/fancy-heading/fancy-heading';
import { redirect } from 'next/navigation';

/**
 * Defines the "/teams/self" page.
 * @return {ReactNode} Team of self page component.
 * @constructor
 */
export default async function TeamOfSelfPage(): Promise<ReactNode> {
  const session = await getServerSession();
  const user = await getUserBySession(session);

  if (!user) {
    return (
      <>
        <FancyHeading isRoman title="Грешка" />
        <div className="h-2/3 grid place-items-center">
          <h1 className="text-2xl font-bold text-white">
            Не сте влезли в профила си.
          </h1>
        </div>
      </>
    );
  }

  await redirect(`/teams/${user.teamId}`);
}

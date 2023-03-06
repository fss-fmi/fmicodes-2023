import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { getUserBySession } from '../../../pages/api/users/self';
import { getTeamByIdString } from '../../../pages/api/teams/[id]';
import FancyHeading from '../../../components/fancy-heading/fancy-heading';
import TeamProfile from '../../../components/team-profile/team-profile';

/**
 * Defines the "/teams/[id]" page.
 * @return {ReactNode} Team by id page component.
 * @constructor
 */
export default async function TeamByIdPage({ params }): Promise<ReactNode> {
  const id = params.id;

  const session = await getServerSession();
  const user = await getUserBySession(session);
  const team = await getTeamByIdString(id as string);

  if (!team) {
    return (
      <>
        <FancyHeading isRoman title="Грешка" />
        <div className="h-2/3 grid place-items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Отборът не е намерен.
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <FancyHeading title={`Отбор ${team.name}`} />
      <div className="h-2/3 grid place-items-center">
        <TeamProfile team={team} user={user} />
      </div>
    </>
  );
}

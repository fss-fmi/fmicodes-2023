import TeamForm from '../../../components/team-form/team-form';
import { ReactNode } from 'react';
import { getTechnologies } from '../../../pages/api/technologies';
import FancyHeading from '../../../components/fancy-heading/fancy-heading';
import { getUserBySession } from '../../../pages/api/users/self';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

/**
 * Defines the "/teams/create" page.
 * @return {ReactNode} New team page component.
 * @constructor
 */
export default async function NewTeamPage(): Promise<ReactNode> {
  const session = await getServerSession();
  const user = await getUserBySession(session);

  if (!user) {
    await redirect('/auth/login?error=Не сте влезли в системата!');
    return;
  }

  if (user.teamId) {
    await redirect('/teams?error=Вече сте част от отбор!');
    return;
  }

  const technologies = await getTechnologies();

  return (
    <div className="new-team-page">
      <FancyHeading title="Създаване на отбор" />
      <TeamForm technologies={technologies} />
    </div>
  );
}

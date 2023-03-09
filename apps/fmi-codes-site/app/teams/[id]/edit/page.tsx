/**
 * Defines the "/teams/{id}/edit" page.
 * @return {ReactNode} Team edit page component.
 * @constructor
 */
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { getUserBySession } from '../../../../pages/api/users/self';
import { redirect } from 'next/navigation';
import FancyHeading from '../../../../components/fancy-heading/fancy-heading';
import { getTechnologies } from '../../../../pages/api/technologies';
import TeamForm from '../../../../components/team-form/team-form';

export default async function TeamEditPage(): Promise<ReactNode> {
  const session = await getServerSession();
  const user = await getUserBySession(session);

  if (!user) {
    await redirect('/auth/login?error=Не сте влезли в системата!');
    return;
  }

  if (!user.teamCaptain) {
    await redirect('/teams?error=Не сте капитан на отбор!');
    return;
  }

  const technologies = await getTechnologies();

  return (
    <>
      <FancyHeading title="Редактиране на отбор" />
      <TeamForm team={user.teamCaptain} technologies={technologies} />
    </>
  );
}

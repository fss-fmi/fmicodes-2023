import TeamRegistrationForm from '../../../components/team-registration-form/team-registration-form';
import { ReactNode } from 'react';
import { getTechnologies } from '../../../pages/api/technologies';
import FancyHeading from '../../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/teams/create" page.
 * @return {ReactNode} New team page component.
 * @constructor
 */
export default async function NewTeamPage(): Promise<ReactNode> {
  const technologies = await getTechnologies();
  return (
    <div className="new-team-page">
      <FancyHeading title="Създаване на отбор" />
      <TeamRegistrationForm
        title="Създаване на отбор"
        technologies={technologies}
      />
    </div>
  );
}

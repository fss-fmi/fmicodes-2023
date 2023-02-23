import TeamRegistrationForm from '../../../components/team-registration-form/team-registration-form';
import { ReactNode } from 'react';

/**
 * Defines the "/teams/create" page.
 * @return {ReactNode} New team page component.
 * @constructor
 */
export default function NewTeamPage(): ReactNode {
  return (
    <div className="new-team-page">
      <TeamRegistrationForm title="Създаване на отбор" />
    </div>
  );
}

import { ReactNode } from 'react';
import TeamCard from '../../components/team-card/team-card';
import { getTeams } from '../../pages/api/teams';
import TeamWidget from '../../components/team-widget/team-widget';
import FancyHeading from '../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/teams" page.
 * @return {ReactNode} Teams page component.
 * @constructor
 */
export default async function TeamsPage(): Promise<ReactNode> {
  const teams = await getTeams();

  return (
    <div className="teams-page">
      <FancyHeading title="Отбори" />

      {/* @ts-expect-error Server Component */}
      <TeamWidget />

      <div
        id="team-cards"
        className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}
      >
        {teams.map((team, i) => (
          <TeamCard
            key={i}
            image="/images/team-banner-temp.png" // TODO: Replace with team banner
            name={team.name}
            roaster={team.members.map(
              (member) => `${member.firstName} ${member.lastName}`
            )}
            projectName={team.projectName}
            projectDescription={team.projectDescription}
            projectTechnologies={team.teamProjectTechnologies.map(
              (r) => r.technology
            )}
          />
        ))}
      </div>
    </div>
  );
}
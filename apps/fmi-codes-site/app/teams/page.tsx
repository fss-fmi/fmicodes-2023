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
    <>
      <FancyHeading title="Отбори" />

      {/* @ts-expect-error Server Component */}
      <TeamWidget />

      {teams.length === 0 ? (
        <div className="acrylic px-4 mt-2 py-2 text-md text-white rounded-lg">
          Все още няма регистрирани отбори. 🥲
        </div>
      ) : null}

      <div
        id="team-cards"
        className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}
      >
        {teams.map((team, i) => (
          <TeamCard
            key={i}
            id={team.id}
            image="/images/team-banner-temp.png" // TODO: Replace with team banner
            name={team.name}
            room={team.room}
            roaster={team.members.map((member) => member.name)}
            projectName={team.projectName}
            projectDescription={team.projectDescription}
            projectTechnologies={team.teamProjectTechnologies.map(
              (r) => r.technology
            )}
          />
        ))}
      </div>
    </>
  );
}

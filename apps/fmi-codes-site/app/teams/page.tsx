import { ReactNode } from 'react';
import TeamCard from '../../components/team-card/team-card';
import { PrismaClient } from '@prisma/client';

/**
 * Defines the "/teams" page.
 * @return {ReactNode} Teams page component.
 * @constructor
 */
export default async function TeamsPage(): Promise<ReactNode> {
  const prisma = new PrismaClient();
  const teams = await prisma.team.findMany({
    include: {
      members: true,
      teamProjectTechnologies: { include: { technology: true } },
    },
  });

  console.log(teams[0].teamProjectTechnologies);
  return (
    <div className="teams-page">
      <h1>Teams</h1>
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
        {teams.map((team, i) => (
          <TeamCard
            key={i}
            image="/images/team-banner-temp.jpeg"
            name={team.name}
            roaster={team.members.map(
              (member) => `${member.firstName} ${member.lastName}`
            )}
            technologies={team.teamProjectTechnologies.map((r) => r.technology)}
          />
        ))}
      </div>
    </div>
  );
}

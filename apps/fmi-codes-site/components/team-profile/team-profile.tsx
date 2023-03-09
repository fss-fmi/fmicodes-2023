import { Team, TeamProjectTechnology, Technology, User } from '@prisma/client';
import InviteUsersButton from '../invite-users-button/invite-users-button';
import { getTechnologies } from '../../pages/api/technologies';
import EditTeamButton from '../../components/edit-team-button/edit-team-button';
import LeaveTeamButton from '../leave-team-button/leave-team-button';
import { UserWithoutPasswordWithJoins } from '../../lib/types';
import UserProfileWidget from '../user-profile-widget/user-profile-widget';
import TechnologiesShowcase from '../technologies-showcase/technologies-showcase';
import FancyLink from '../fancy-link/fancy-link';

export interface TeamProfileProps {
  team:
    | Team & {
        members: User[];
        teamProjectTechnologies: (TeamProjectTechnology & {
          technology: Technology;
        })[];
      };
  user: UserWithoutPasswordWithJoins | null;
}

export async function TeamProfile(props: TeamProfileProps) {
  const technologies = await getTechnologies();
  return (
    <div className="w-full acrylic rounded-lg md:mt-0 sm:max-w-6xl xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex flex-wrap justify-around">
          {props.team.members.map((member) => (
            <UserProfileWidget
              key={member.id}
              member={member}
              user={props.user}
              team={props.team}
            />
          ))}
        </div>
        {props.team.projectName ||
        props.team.projectDescription ||
        props.team.teamProjectTechnologies.length > 0 ? (
          <div className="border-t border-gray-700 pt-4 md:pt-6">
            <h2 className="text-2xl font-bold block">Проект</h2>
            <div className="flex flex-row space-x-2 h-full flex-wrap">
              <div className="flex flex-col bg-gray-800 bg-opacity-10 border border-gray-700 rounded-lg p-4 flex-auto m-1">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold">Име на проекта</h3>
                  {props.team.projectName ? (
                    <p>{props.team.projectName}</p>
                  ) : (
                    <p className="text-gray-500">Няма име</p>
                  )}
                  <h3 className="text-xl font-bold">Описание на проекта</h3>
                  {props.team.projectDescription ? (
                    <p className="h-10">{props.team.projectDescription}</p>
                  ) : (
                    <p className="h-10 text-gray-500">Няма описание</p>
                  )}
                  {props.team.projectLink || props.team.projectRepository ? (
                    <div className="flex flex-row space-x-2">
                      {props.team.projectLink ? (
                        <FancyLink href={props.team.projectLink} isPrimary>
                          Линк към проекта
                        </FancyLink>
                      ) : null}
                      {props.team.projectRepository ? (
                        <FancyLink
                          href={props.team.projectRepository}
                          isPrimary
                          target="_blank"
                        >
                          Линк към хранилище на проекта
                        </FancyLink>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col space-y-2 bg-gray-800 bg-opacity-10 border border-gray-700 rounded-lg p-4 flex-auto m-1">
                <h3 className="text-xl font-bold">Технологии</h3>
                <TechnologiesShowcase
                  technologies={props.team.teamProjectTechnologies.map(
                    (t) => t.technology
                  )}
                />
              </div>
            </div>
          </div>
        ) : null}
        {props.user?.teamId === props.team.id ? (
          <div className="flex flex-row space-x-2 border-t border-gray-700 pt-4 md:pt-6">
            {props.user?.id === props.team.captainId ? (
              <>
                <InviteUsersButton technologies={technologies} />
                <EditTeamButton teamId={props.team.id} />
              </>
            ) : null}

            {props.user?.id !== props.team.captainId ||
            props.team.members.length === 1 ? (
              <LeaveTeamButton />
            ) : null}
          </div>
        ) : null}
        {props.user?.teamId === null && props.team.acceptsNewMembers ? (
          <div className="flex flex-row space-x-2 border-t border-gray-700 pt-4 md:pt-6">
            {/*<FancyButton isPrimary>Заяви присъединяване</FancyButton>*/}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TeamProfile;

import { Team, TeamProjectTechnology, Technology, User } from '@prisma/client';
import InviteUsersButton from '../invite-users-button/invite-users-button';
import { getTechnologies } from '../../pages/api/technologies';
import FancyButton from '../fancy-button/fancy-button';
import { FireIcon, UserMinusIcon } from '@heroicons/react/24/outline';
import EditTeamButton from '../../components/edit-team-button/edit-team-button';
import LeaveTeamButton from '../leave-team-button/leave-team-button';
import { UserWithoutPasswordWithJoins } from '../../lib/types';

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
            <div
              key={member.id}
              className="flex flex-col w-48 text-center items-center space-y-1"
            >
              <img
                className="h-28 w-28 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                // TODO: src={session.user.image}
                alt=""
              />
              <h3 className="text-bold">
                {member.firstName + ' ' + member.lastName}
              </h3>
              <p>{member.university}</p>
              <p>{member.universityMajor}</p>
              <p>
                {member.universityDegree}, {member.universityYear} курс
              </p>

              {props.user?.id === props.team.captainId &&
              props.user?.id !== member.id ? (
                <>
                  <FancyButton>
                    <FireIcon className="inline h-5 w-5" /> Направи капитан
                  </FancyButton>
                  <FancyButton>
                    <UserMinusIcon className="inline h-5 w-5" /> Отстрани от
                    отбора
                  </FancyButton>
                </>
              ) : null}
            </div>
          ))}
        </div>
        {props.user?.teamId === props.team.id ? (
          <div className="flex flex-row space-x-2 border-t border-gray-200 dark:border-gray-700 pt-4 md:pt-6">
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
      </div>
    </div>
  );
}

export default TeamProfile;

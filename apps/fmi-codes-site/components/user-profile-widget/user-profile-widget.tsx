import { UserWithoutPasswordWithJoins } from '../../lib/types';
import { Team, User } from '@prisma/client';
import FancyButton from '../fancy-button/fancy-button';
import { FireIcon, UserMinusIcon } from '@heroicons/react/24/outline';

export interface UserProfileWidgetProps {
  member: User;
  user: UserWithoutPasswordWithJoins | null;
  team: Team;
}

export function UserProfileWidget(props: UserProfileWidgetProps) {
  return (
    <div
      key={props.member.id}
      className="flex flex-col w-56 text-center items-center space-y-1 p-4 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-10"
    >
      <img
        className="h-28 w-28 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        // TODO: src={session.user.image}
        alt=""
      />
      <h3 className="font-bold text-lg">{props.member.name}</h3>
      <p>{props.member.university}</p>
      <p>{props.member.universityMajor}</p>
      <p>
        {props.member.universityDegree}, {props.member.universityYear} курс
      </p>

      {props.user?.id === props.team.captainId &&
      props.user?.id !== props.member.id ? (
        <>
          <FancyButton>
            <FireIcon className="inline h-5 w-5" /> Направи капитан
          </FancyButton>
          <FancyButton>
            <UserMinusIcon className="inline h-5 w-5" /> Отстрани от отбора
          </FancyButton>
        </>
      ) : null}
    </div>
  );
}

export default UserProfileWidget;

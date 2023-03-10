import { UserWithoutPasswordWithJoins } from '../../lib/types';
import { Team, User } from '@prisma/client';
import Image from 'next/image';

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
      <Image
        className="h-28 w-28 rounded-full border border-gray-700"
        src="/images/pfp.png"
        height={200}
        width={200}
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
          {/*<FancyButton>*/}
          {/*  <FireIcon className="inline h-5 w-5" /> Направи капитан*/}
          {/*</FancyButton>*/}
          {/*<FancyButton>*/}
          {/*  <UserMinusIcon className="inline h-5 w-5" /> Отстрани от отбора*/}
          {/*</FancyButton>*/}
        </>
      ) : null}
    </div>
  );
}

export default UserProfileWidget;

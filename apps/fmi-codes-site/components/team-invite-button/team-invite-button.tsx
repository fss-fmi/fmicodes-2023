import { UserWithoutPassword } from '../../lib/types';
import FancyButton from '../fancy-button/fancy-button';
import { CheckCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export interface TeamInviteButtonProps {
  user: UserWithoutPassword;
}

export function TeamInviteButton(props: TeamInviteButtonProps) {
  const [isInvited, setIsInvited] = useState(false);
  const onClick = async () => {
    try {
      const res = await fetch(`/api/team-invitations`, {
        method: 'POST',
        body: JSON.stringify({
          inviteeId: props.user.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        setIsInvited(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <FancyButton isPrimary disabled={isInvited} onClick={onClick}>
        {isInvited ? (
          <CheckCircleIcon className="inline h-7 w-7" />
        ) : (
          <UserPlusIcon className="inline h-7 w-7" />
        )}
      </FancyButton>
    </>
  );
}

export default TeamInviteButton;

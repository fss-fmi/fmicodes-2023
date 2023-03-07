'use client';

import { redirect } from 'next/navigation';
import FancyButton from '../fancy-button/fancy-button';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { TeamInvitation } from '@prisma/client';

export interface DeclineInviteButtonProps {
  invite: TeamInvitation;
}

export function DeclineInviteButton(props: DeclineInviteButtonProps) {
  const onClick = async () => {
    try {
      const res = await fetch(`/api/team-invites/${props.invite.id}/respond`, {
        method: 'POST',
        body: JSON.stringify({
          accept: false,
        }),
      });

      if (res.status === 200) {
        redirect(`/teams/${props.invite.teamId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <FancyButton onClick={onClick}>
        <XCircleIcon className="inline h-7 w-7" />
      </FancyButton>
    </>
  );
}

export default DeclineInviteButton;

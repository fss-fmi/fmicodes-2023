'use client';

import { TeamInvitation } from '@prisma/client';
import { redirect } from 'next/navigation';
import FancyButton from '../fancy-button/fancy-button';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export interface AcceptInviteButtonProps {
  invite: TeamInvitation;
}

export function AcceptInviteButton(props: AcceptInviteButtonProps) {
  const onClick = async () => {
    try {
      const res = await fetch(`/api/team-invites/${props.invite.id}/respond`, {
        method: 'POST',
        body: JSON.stringify({
          accept: true,
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
        <CheckCircleIcon className="inline h-7 w-7" />
      </FancyButton>
    </>
  );
}

export default AcceptInviteButton;

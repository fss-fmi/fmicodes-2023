'use client';

import FancyButton from '../fancy-button/fancy-button';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';

export function LeaveTeamButton() {
  const onClick = async () => {
    try {
      const res = await fetch('/api/teams/self/leave', {
        method: 'POST',
      });

      if (res.status === 200) {
        redirect('/teams');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <FancyButton isPrimary onClick={onClick}>
        <ArrowLeftOnRectangleIcon className="inline h-5 w-5" /> Напусни отбора
      </FancyButton>
    </>
  );
}

export default LeaveTeamButton;

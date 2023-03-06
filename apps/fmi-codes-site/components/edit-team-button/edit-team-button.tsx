'use client';

import { useRouter } from 'next/navigation';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import FancyButton from '../fancy-button/fancy-button';

export interface EditTeamButtonProps {
  teamId: number;
}

export function EditTeamButton(props: EditTeamButtonProps) {
  const router = useRouter();
  return (
    <FancyButton
      isPrimary
      onClick={() => {
        router.push(`/teams/${props.teamId}/edit`);
      }}
    >
      <PencilSquareIcon className="inline h-5 w-5" /> Редактирай отбора
    </FancyButton>
  );
}

export default EditTeamButton;

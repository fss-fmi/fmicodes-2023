'use client';

import { Technology } from '@prisma/client';
import { useEffect, useState } from 'react';
import FancyModal from '../fancy-modal/fancy-modal';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import FormTextField from '../form-text-field/form-text-field';
import { useForm } from 'react-hook-form';
import { UserWithoutPassword } from '../../lib/types';
import TeamInviteButton from '../team-invite-button/team-invite-button';

export interface InviteUsersButtonProps {
  technologies: Technology[];
}

export function InviteUsersButton(props: InviteUsersButtonProps) {
  const [results, setResults] = useState<UserWithoutPassword[]>([]);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    const subscription = watch(async (value) => {
      try {
        const res = await fetch(`/api/users?q=${value.query}`, {
          method: 'GET',
        });

        const users = await res.json();
        setResults(users);
      } catch (error) {
        console.error(error);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <FancyModal
        title="Покани потребители"
        openButtonContent={
          <UserPlusIcon className="h-5 w-5">Покани потребители</UserPlusIcon>
        }
      >
        <FormTextField
          name="query"
          label="Търсене"
          placeholder="Име на участник"
          register={register}
          errors={errors}
        />
        <div className="flex flex-col space-y-2">
          {results.map((user, i) => (
            <div
              key={i}
              className="flex flex-row space-x-2 grow space-y-1 p-2 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-10"
            >
              <div className="flex flex-col grow">
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <span className="text-sm">
                  {user.university}, {user.universityMajor}
                </span>
              </div>
              <div className="flex flex-row">
                <TeamInviteButton user={user} />
              </div>
            </div>
          ))}
        </div>
      </FancyModal>
    </>
  );
}

export default InviteUsersButton;

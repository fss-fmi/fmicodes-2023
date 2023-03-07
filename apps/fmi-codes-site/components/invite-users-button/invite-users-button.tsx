'use client';

import { Technology } from '@prisma/client';
import { useEffect } from 'react';
import FancyModal from '../fancy-modal/fancy-modal';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import FormTextField from '../form-text-field/form-text-field';
import { useForm } from 'react-hook-form';

export interface InviteUsersButtonProps {
  technologies: Technology[];
}

export function InviteUsersButton(props: InviteUsersButtonProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const delayDebounceFn = setTimeout(() => {
        console.log(value);
      }, 3000);

      return () => clearTimeout(delayDebounceFn);
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
      </FancyModal>
    </>
  );
}

export default InviteUsersButton;

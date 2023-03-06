'use client';

import { Technology } from '@prisma/client';
import FancyButton from '../fancy-button/fancy-button';
import { useEffect, useState } from 'react';
import FancyModal from '../fancy-modal/fancy-modal';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import FormTextField from '../form-text-field/form-text-field';
import { useForm } from 'react-hook-form';

export interface InviteUsersButtonProps {
  technologies: Technology[];
}

export function InviteUsersButton(props: InviteUsersButtonProps) {
  const [isModalShown, setIsModalShown] = useState(false);

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
      <FancyButton
        isPrimary
        onClick={() => {
          setIsModalShown(true);
        }}
      >
        <UserPlusIcon className="inline h-5 w-5" /> Покани потребители
      </FancyButton>

      <FancyModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        title="Покани потребители"
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

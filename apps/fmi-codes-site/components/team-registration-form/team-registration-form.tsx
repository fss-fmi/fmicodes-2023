'use client';

import FancyButton from '../fancy-button/fancy-button';
import FormTechnologiesField from '../form-technologies-field/form-technologies-field';
import FormTextField from '../form-text-field/form-text-field';
import InviteUsersButton from '../invite-users-button/invite-users-button';
import { Technology } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface TeamRegistrationFormProps {
  title: string;
  technologies: Technology[];
}

export function TeamRegistrationForm(props: TeamRegistrationFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const [error, setError] = useState<string | null>(null);

  const formFields = [
    {
      name: 'name',
      type: 'text',
      label: 'Име на отбора',
      required: true,
      formOptions: {
        maxLength: 30,
      },
    },
    {
      name: 'projectName',
      type: 'text',
      label: 'Име на проекта',
      required: false,
      formOptions: {
        maxLength: 30,
      },
    },
    {
      name: 'projectDescription',
      type: 'text',
      label: 'Описание на проекта',
      required: false,
      placeholder: 'Подробно описание на проекта, който разработвате...',
    },
    {
      name: 'projectRepository',
      type: 'text',
      label: 'Линк към кодовото хранилище',
      required: false,
      placeholder: '',
    },
    {
      name: 'projectLink',
      type: 'text',
      label: 'Линк към проекта',
      required: false,
      placeholder: '',
    },
    {
      name: 'teamProjectTechnologies',
      type: 'technologies',
      label: 'Използвани технологии',
      required: false,
      technologies: props.technologies,
    },
  ];

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      reset();

      if (res.status === 201) {
        router.push(`/teams`);
      } else {
        const error = await res.json();
        setError(error.error);
      }
    } catch (error) {
      console.error(error);
      setError(error.toString());
    }
  };

  return (
    <div className="w-full acrylic rounded-lg md:mt-0 sm:max-w-6xl xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="xl:columns-2">
            {formFields.map((field) => {
              switch (field.type) {
                case 'text':
                case 'email':
                case 'phone':
                case 'password':
                  return (
                    <FormTextField
                      key={field.name}
                      register={register}
                      errors={errors}
                      {...field}
                    />
                  );
                case 'technologies':
                  return (
                    // @ts-expect-error TODO: Fix types
                    <FormTechnologiesField
                      key={field.name}
                      register={register}
                      errors={errors}
                      {...field}
                    />
                  );
              }
            })}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 md:pt-6">
            <InviteUsersButton technologies={props.technologies} />
          </div>
          <div className="flex justify-end">
            <FancyButton isPrimary>Създай отбор</FancyButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeamRegistrationForm;

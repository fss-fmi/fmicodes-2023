'use client';

import { useForm } from 'react-hook-form';
import FormTextField from '../form-text-field/form-text-field';
import FancyButton from '../fancy-button/fancy-button';
import { Technology } from '@prisma/client';
import { useRouter } from 'next/navigation';
import FormTechnologiesField from '../form-technologies-field/form-technologies-field';

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
  } = useForm();

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

      const id = res.body['id'];

      if (res.status === 201) {
        await router.push(`/teams`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-6xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Регистрация
        </h1>
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
          <div className="flex justify-end">
            <FancyButton isPrimary>Създай отбор</FancyButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeamRegistrationForm;

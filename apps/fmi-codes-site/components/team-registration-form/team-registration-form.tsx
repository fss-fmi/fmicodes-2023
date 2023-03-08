'use client';

import FancyButton from '../fancy-button/fancy-button';
import FormTechnologiesField from '../form-technologies-field/form-technologies-field';
import FormTextField from '../form-text-field/form-text-field';
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
      spanRow: false,
      placeholder: '//insert name here (незадължително)',
      formOptions: {
        maxLength: 30,
      },
    },
    {
      name: 'projectName',
      type: 'text',
      label: 'Име на проекта',
      required: false,
      spanRow: false,
      placeholder: '//insert name here (незадължително)',
      formOptions: {
        maxLength: 30,
      },
    },
    {
      name: 'projectDescription',
      type: 'text',
      label: 'Описание на проекта',
      required: false,
      spanRow: true,
      placeholder: 'Подробно описание на проекта, който разработвате...',
    },
    {
      name: 'projectRepository',
      type: 'text',
      label: 'Линк към кодовото хранилище',
      required: false,
      placeholder: 'https://github.com/... (незадължително)',
    },
    {
      name: 'projectLink',
      type: 'text',
      label: 'Линк към проекта',
      required: false,
      placeholder: 'https://project.com (незадължително)',
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

      const json = await res.json();
      const id = json.id;

      if (res.status === 201) {
        router.push(`/teams/${id}`);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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

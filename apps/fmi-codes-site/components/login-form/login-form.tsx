'use client';

import { useForm } from 'react-hook-form';
import FormTextField from '../form-text-field/form-text-field';
import { signIn } from 'next-auth/react';
import FancyButton from '../fancy-button/fancy-button';

interface LoginFormProps {
  error?: string;
}

export function LoginForm(props: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const formFields = [
    {
      name: 'email',
      type: 'email',
      label: 'Имейл адрес',
      required: true,
      placeholder: 'name@email.com',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Парола',
      required: true,
      placeholder: '••••••••',
      formOptions: {
        minLength: 8,
        maxLength: 120,
      },
    },
  ];

  const onSubmit = async (data) => {
    try {
      const res = await signIn('credentials', {
        ...data,
        callbackUrl: '/', //TODO: redirect to previous page
      });
      console.debug(`signing:onsubmit:res`, res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full acrylic rounded-lg md:mt-0 sm:max-w-6xl xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Вход
        </h1>
        <div>
          {props.error && (
            <div className="text-red-500 text-sm">{props.error}</div>
          )}
        </div>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {formFields.map((field) => {
            return (
              <FormTextField
                key={field.name}
                register={register}
                errors={errors}
                {...field}
              />
            );
          })}
          <div className="flex justify-end">
            <FancyButton isPrimary>Вход</FancyButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

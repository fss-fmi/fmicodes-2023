'use client';

import { useForm } from 'react-hook-form';
import FormTextField from '../form-text-field/form-text-field';
import { signIn } from 'next-auth/react';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-6xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Вход
        </h1>
        <form
          className="space-y-4 md:space-y-6 xl:columns-2"
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
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              Вход
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

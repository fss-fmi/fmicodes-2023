import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface FormImageFieldProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export function FormImageField(props: FormImageFieldProps) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
        {props.description && (
          <span className="block text-xs text-gray-500 text-justify">
            {props.description}
          </span>
        )}
        <div className="flex flex-col items-center justify-center w-full h-36 my-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">
                Кликнете тук за да качите снимка
              </span>{' '}
              или я пуснете тук
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, SVG или GIF (Макс. 5MB)
            </p>
            {file && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Прикачена е {file.name} с размер{' '}
                {Math.round((file.size / 1024 / 1024) * 100) / 100} MB
              </p>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            required={props.required}
            className="hidden"
            accept="image/png,image/jpeg,image/gif,image/svg+xml"
            {...props.register(props.name, {
              required: props.required,
              validate: {
                acceptedFormats: (files) =>
                  [
                    'image/jpeg',
                    'image/png',
                    'image/svg+xml',
                    'image/gif',
                  ].includes(files[0]?.type) ||
                  'Позволените формати са само PNG, JPG, SVG или GIF.',
                lessThan5MB: (files) =>
                  files[0]?.size < 5 * 1024 * 1024 ||
                  'Максималният размер на снимката е 5MB.',
              },
              onChange: (e) => setFile(e.target.files[0]),
            })}
          />
        </div>
        {props.errors[props.name] && (
          <p className="text-normal text-red-500 ">
            {String(props.errors[props.name].message)}
          </p>
        )}
      </label>
    </>
  );
}

export default FormImageField;
import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';

export interface FormImageFieldProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  spanRow?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export function FormImageField(props: FormImageFieldProps) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <label
        className={
          'block mb-2 text-sm font-medium text-white' +
          (props.spanRow ? ' col-span-full' : '')
        }
      >
        {props.label}
        {props.required && <span className="text-red-500">*</span>}
        {props.description && (
          <span className="block text-xs text-gray-500 text-justify">
            {props.description}
          </span>
        )}
        <div className="acrylic flex flex-col items-center justify-center w-full h-36 my-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-700 border-gray-600 ">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <DocumentPlusIcon className="w-10 h-10 mb-3 text-gray-200" />
            <p className="mb-2 text-sm text-gray-200">
              <span className="font-semibold">
                Кликнете тук за да качите снимка
              </span>{' '}
              или я пуснете тук
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG, SVG или GIF (Макс. 5MB)
            </p>
            {file && (
              <p className="text-xs text-gray-400">
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
        <div className="text-normal text-red-500 h-4">
          {props.errors[props.name] && (
            <span>{String(props.errors[props.name]?.message)}</span>
          )}
        </div>
      </label>
    </>
  );
}

export default FormImageField;

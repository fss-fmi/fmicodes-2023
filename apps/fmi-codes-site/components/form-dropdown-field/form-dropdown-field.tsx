import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface FormDropdownFieldProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  options: string[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export function FormDropdownField(props: FormDropdownFieldProps) {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
        {props.description && (
          <span className="text-xs text-gray-500">{props.description}</span>
        )}
        <select
          className="border-solid border-gray-300 border py-2 px-2 my-1 w-full rounded text-gray-700"
          name={props.name}
          required={props.required}
          {...props.register(props.name, {
            required: props.required,
          })}
        >
          {[...(!props.required ? [''] : []), ...props.options].map(
            (option) => (
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
        </select>
        {props.errors[props.name] && (
          <p className="text-normal text-red-500">
            {String(props.errors[props.name].message)}
          </p>
        )}
      </label>
    </>
  );
}

export default FormDropdownField;

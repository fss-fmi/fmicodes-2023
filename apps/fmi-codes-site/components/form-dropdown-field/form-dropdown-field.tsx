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
      <label className="block mb-2 text-sm font-medium text-white">
        {props.label}
        {props.required && <span className="text-red-500">*</span>}
        {props.description && (
          <span className="text-xs text-gray-500">{props.description}</span>
        )}
        <select
          className="border-solid border-gray-300 border py-2 px-2 my-1 w-full rounded text-gray-700"
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
        <div className="text-normal text-red-500 h-4">
          {props.errors[props.name] && (
            <span>{String(props.errors[props.name]?.message)}</span>
          )}
        </div>
      </label>
    </>
  );
}

export default FormDropdownField;

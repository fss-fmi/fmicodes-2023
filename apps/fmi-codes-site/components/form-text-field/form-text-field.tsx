import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export interface FormTextFieldProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  formOptions?: RegisterOptions;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export function FormTextField(props: FormTextFieldProps) {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
        {props.description && (
          <span className="text-xs text-gray-500">{props.description}</span>
        )}
        <input
          className="border-solid border-gray-300 border py-2 px-2 my-1 w-full rounded text-gray-700"
          name={props.name}
          type={props.type}
          // required={props.required}
          placeholder={props.placeholder}
          {...props.register(props.name, {
            required: props.required,
            validate: {
              isRequired: (value) => {
                if (props.required && !value) {
                  return 'Това поле е задължително.';
                }
                return true;
              },
              minLength: (value) => {
                if (
                  props.formOptions?.minLength &&
                  value.length < props.formOptions?.minLength
                ) {
                  return `Минималната дължина на това поле е ${props.formOptions?.minLength} символа.`;
                }
                return true;
              },
              maxLength: (value) => {
                if (
                  props.formOptions?.maxLength &&
                  value.length > props.formOptions?.maxLength
                ) {
                  return `Максималната дължина на това поле е ${props.formOptions?.maxLength} символа.`;
                }
                return true;
              },
              pattern: (value) => {
                if (
                  props.formOptions?.pattern &&
                  !value.match(props.formOptions?.pattern)
                ) {
                  return 'Полето съдържа недопустими символи.';
                }
                return true;
              },
            },
          })}
        />
        {props.errors[props.name] && (
          <p className="text-normal text-red-500">
            {String(props.errors[props.name].message)}
          </p>
        )}
      </label>
    </>
  );
}

export default FormTextField;

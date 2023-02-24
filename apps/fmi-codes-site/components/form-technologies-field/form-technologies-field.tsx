import styles from './form-technologies-field.module.scss';
import { Technology } from '@prisma/client';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface FormTechnologiesFieldProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  technologies: Technology[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export function FormTechnologiesField(props: FormTechnologiesFieldProps) {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
        {props.required && <span className="text-red-500">*</span>}
        {props.description && (
          <span className="text-xs text-gray-500">{props.description}</span>
        )}

        <div className="flex">
          {props.technologies.map((tech, i) => (
            <label
              className={styles['badge']}
              key={i}
              style={{ backgroundColor: tech.color }}
            >
              <input
                type="checkbox"
                name={tech.name}
                value={tech.id}
                className={styles['badge-checkbox']}
                {...props.register(props.name)}
              />
              <span className={styles['badge-label']}>{tech.name}</span>
            </label>
          ))}
        </div>

        {props.errors[props.name] && (
          <p className="text-normal text-red-500">
            {String(props.errors[props.name].message)}
          </p>
        )}
      </label>
    </>
  );
}

export default FormTechnologiesField;

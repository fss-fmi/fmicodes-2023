import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { Technology } from '@prisma/client';
import styles from './form-technologies-field.module.scss';

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

        <div className="flex flex-wrap justify-between">
          {props.technologies.map((tech, i) => (
            <label
              className={styles['badge']}
              key={i}
              style={{ backgroundColor: tech.color }}
            >
              <input
                type="checkbox"
                value={tech.id}
                className={styles['badge-checkbox']}
                {...props.register(props.name)}
              />
              <span className={styles['badge-label']}>{tech.name}</span>
            </label>
          ))}
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

export default FormTechnologiesField;

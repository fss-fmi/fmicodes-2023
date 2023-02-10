import { render } from '@testing-library/react';

import FormDropdownField from './form-dropdown-field';
import { useForm } from 'react-hook-form';

describe('FormDropdownField', () => {
  it('should render successfully', () => {
    const {
      register,
      formState: { errors },
    } = useForm();
    const { baseElement } = render(
      <FormDropdownField
        name=""
        label=""
        options={[]}
        register={register}
        errors={errors}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});

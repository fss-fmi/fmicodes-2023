import { render } from '@testing-library/react';

import FormTechnologiesField from './form-technologies-field';
import { useForm } from 'react-hook-form';

describe('FormTechnologiesField', () => {
  it('should render successfully', () => {
    const {
      register,
      formState: { errors },
    } = useForm();

    const { baseElement } = render(
      <FormTechnologiesField
        name=""
        label=""
        technologies={[]}
        register={register}
        errors={errors}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});

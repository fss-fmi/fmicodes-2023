import { render } from '@testing-library/react';

import FormTextField from './form-text-field';
import { useForm } from 'react-hook-form';

describe('FormTextField', () => {
  it('should render successfully', () => {
    const {
      register,
      formState: { errors },
    } = useForm();
    const { baseElement } = render(
      <FormTextField name="" label="" register={register} errors={errors} />
    );
    expect(baseElement).toBeTruthy();
  });
});

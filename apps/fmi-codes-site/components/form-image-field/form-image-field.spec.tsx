import { render } from '@testing-library/react';

import FormImageField from './form-image-field';
import { useForm } from 'react-hook-form';

describe('FormImageField', () => {
  it('should render successfully', () => {
    const {
      register,
      formState: { errors },
    } = useForm();
    const { baseElement } = render(
      <FormImageField name="" label="" register={register} errors={errors} />
    );
    expect(baseElement).toBeTruthy();
  });
});

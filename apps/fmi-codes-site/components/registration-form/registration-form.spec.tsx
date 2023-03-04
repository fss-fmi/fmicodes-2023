import { render } from '@testing-library/react';

import RegistrationForm from './registration-form';

describe('RegistrationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegistrationForm technologies={[]} />);
    expect(baseElement).toBeTruthy();
  });
});

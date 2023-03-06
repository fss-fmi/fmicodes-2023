import { render } from '@testing-library/react';

import FormConditionsField from './form-conditions-field';

describe('FormConditionsField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormConditionsField />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import FormSearchInput from './form-search-input';

describe('FormSearchInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormSearchInput />);
    expect(baseElement).toBeTruthy();
  });
});

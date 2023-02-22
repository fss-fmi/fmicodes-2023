import { render } from '@testing-library/react';

import TeamForm from './team-form';

describe('TeamForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeamForm />);
    expect(baseElement).toBeTruthy();
  });
});

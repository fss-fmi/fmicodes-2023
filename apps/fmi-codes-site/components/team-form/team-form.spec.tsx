import { render } from '@testing-library/react';

import TeamForm from './team-form';

describe('TeamRegistrationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeamForm technologies={[]} />);
    expect(baseElement).toBeTruthy();
  });
});

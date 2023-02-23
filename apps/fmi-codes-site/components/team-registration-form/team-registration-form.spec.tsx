import { render } from '@testing-library/react';

import TeamRegistrationForm from './team-registration-form';

describe('TeamRegistrationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TeamRegistrationForm title="Създаване на отбор" />
    );
    expect(baseElement).toBeTruthy();
  });
});

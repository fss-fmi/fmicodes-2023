import { render } from '@testing-library/react';

import LeaveTeamButton from './leave-team-button';

describe('LeaveTeamButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeaveTeamButton />);
    expect(baseElement).toBeTruthy();
  });
});

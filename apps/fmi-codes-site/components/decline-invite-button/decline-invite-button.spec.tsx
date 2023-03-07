import { render } from '@testing-library/react';

import DeclineInviteButton from './decline-invite-button';

describe('DeclineInviteButton', () => {
  it('should render successfully', () => {
    const invite = {
      id: 1,
      teamId: 1,
      userId: '',
      createdAt: new Date(),
    };
    const { baseElement } = render(<DeclineInviteButton invite={invite} />);
    expect(baseElement).toBeTruthy();
  });
});

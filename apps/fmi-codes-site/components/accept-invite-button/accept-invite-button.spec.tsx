import { render } from '@testing-library/react';

import AcceptInviteButton from './accept-invite-button';

describe('AcceptInviteButton', () => {
  it('should render successfully', () => {
    const invite = {
      id: 1,
      teamId: 1,
      userId: '',
      createdAt: new Date(),
    };
    const { baseElement } = render(<AcceptInviteButton invite={invite} />);
    expect(baseElement).toBeTruthy();
  });
});

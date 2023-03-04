import { render } from '@testing-library/react';

import InviteUsersButton from './invite-users-button';

describe('InviteUsersButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InviteUsersButton technologies={[]} />);
    expect(baseElement).toBeTruthy();
  });
});

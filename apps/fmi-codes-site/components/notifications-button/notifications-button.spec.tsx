import { render } from '@testing-library/react';

import NotificationsButton from './notifications-button';

describe('NotificationsButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationsButton />);
    expect(baseElement).toBeTruthy();
  });
});

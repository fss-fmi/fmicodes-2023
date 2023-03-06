import { render } from '@testing-library/react';

import CookieConsent from './cookie-consent';

describe('CookieConsent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CookieConsent />);
    expect(baseElement).toBeTruthy();
  });
});

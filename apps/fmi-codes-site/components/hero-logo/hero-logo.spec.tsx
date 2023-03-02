import { render } from '@testing-library/react';

import HeroLogo from './hero-logo';

describe('HeroLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeroLogo />);
    expect(baseElement).toBeTruthy();
  });
});

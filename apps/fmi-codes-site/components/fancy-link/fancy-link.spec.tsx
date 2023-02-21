import { render } from '@testing-library/react';

import FancyLink from './fancy-link';

describe('FancyLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FancyLink href="/">Example</FancyLink>);
    expect(baseElement).toBeTruthy();
  });
});

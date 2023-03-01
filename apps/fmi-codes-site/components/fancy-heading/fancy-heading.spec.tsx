import { render } from '@testing-library/react';

import FancyHeading from './fancy-heading';

describe('FancyHeading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FancyHeading title="" />);
    expect(baseElement).toBeTruthy();
  });
});

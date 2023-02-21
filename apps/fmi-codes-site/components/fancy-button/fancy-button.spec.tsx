import { render } from '@testing-library/react';

import FancyButton from './fancy-button';

describe('FancyButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FancyButton>Example</FancyButton>);
    expect(baseElement).toBeTruthy();
  });
});

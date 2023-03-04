import { render } from '@testing-library/react';

import CircularLoadingIndicator from './circular-loading-indicator';

describe('CircularLoadingIndicator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CircularLoadingIndicator />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import BackgroundBlob from './background-blob';

describe('BackgroundBlob', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BackgroundBlob />);
    expect(baseElement).toBeTruthy();
  });
});

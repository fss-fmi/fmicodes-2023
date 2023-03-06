import { render } from '@testing-library/react';

import TechnologiesShowcase from './technologies-showcase';

describe('TechnologiesShowcase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TechnologiesShowcase technologies={[]} />);
    expect(baseElement).toBeTruthy();
  });
});

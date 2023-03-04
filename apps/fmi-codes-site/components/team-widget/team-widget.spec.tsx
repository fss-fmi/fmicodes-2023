import { render } from '@testing-library/react';

import TeamWidget from './team-widget';

describe('TeamWidget', () => {
  it('should render successfully', () => {
    // @ts-expect-error Server Component.
    const { baseElement } = render(<TeamWidget />);
    expect(baseElement).toBeTruthy();
  });
});

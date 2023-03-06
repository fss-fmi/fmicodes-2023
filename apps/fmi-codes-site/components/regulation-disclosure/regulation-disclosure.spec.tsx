import { render } from '@testing-library/react';

import RegulationDisclosure from './regulation-disclosure';

describe('RegulationDisclosure', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegulationDisclosure />);
    expect(baseElement).toBeTruthy();
  });
});

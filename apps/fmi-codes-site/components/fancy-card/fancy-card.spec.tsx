import { render } from '@testing-library/react';

import FancyCard from './fancy-card';

describe('FancyCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FancyCard image="" title="" content={<></>} />
    );
    expect(baseElement).toBeTruthy();
  });
});

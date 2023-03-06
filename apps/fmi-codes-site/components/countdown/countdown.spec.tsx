import { render } from '@testing-library/react';

import Countdown from './countdown';

describe('Countdown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Countdown targetDate={'2023/03/17 17:00:00'} />
    );
    expect(baseElement).toBeTruthy();
  });
});

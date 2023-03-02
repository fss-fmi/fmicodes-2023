import { render } from '@testing-library/react';

import Countdown from './countdown';

describe('Countdown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Countdown targetDate={new Date()} />);
    expect(baseElement).toBeTruthy();
  });
});

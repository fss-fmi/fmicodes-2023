import { render } from '@testing-library/react';

import HoverCard from './hover-card';
import { mockSession } from 'next-auth/client/__tests__/helpers/mocks';

describe('HoverCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HoverCard title="" image="" subtitle="" link="" borderColor="gold" />
    );
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import TeamCard from './team-card';

describe('TeamCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TeamCard image="" name="" technologies={[]} roaster={[]} />
    );
    expect(baseElement).toBeTruthy();
  });
});

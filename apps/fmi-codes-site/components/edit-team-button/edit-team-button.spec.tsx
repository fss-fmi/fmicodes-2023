import { render } from '@testing-library/react';

import EditTeamButton from './edit-team-button';

describe('EditTeamButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditTeamButton teamId={0} />);
    expect(baseElement).toBeTruthy();
  });
});

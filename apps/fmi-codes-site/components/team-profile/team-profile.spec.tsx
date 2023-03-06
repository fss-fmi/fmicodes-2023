import { render } from '@testing-library/react';

import TeamProfile from './team-profile';
import { Team, TeamProjectTechnology, Technology, User } from '@prisma/client';

describe('TeamProfile', () => {
  it('should render successfully', () => {
    let team:
      | Team & {
          members: User[];
          teamProjectTechnologies: (TeamProjectTechnology & {
            technology: Technology;
          })[];
        };
    // @ts-expect-error Server Component
    const { baseElement } = render(<TeamProfile team={team} user={null} />);
    expect(baseElement).toBeTruthy();
  });
});

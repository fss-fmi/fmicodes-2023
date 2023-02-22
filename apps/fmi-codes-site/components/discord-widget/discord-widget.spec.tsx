import { render } from '@testing-library/react';

import DiscordWidget from './discord-widget';

describe('DiscordWidget', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiscordWidget />);
    expect(baseElement).toBeTruthy();
  });
});

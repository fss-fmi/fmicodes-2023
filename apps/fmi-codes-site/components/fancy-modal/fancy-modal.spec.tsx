import { render } from '@testing-library/react';

import FancyModal from './fancy-modal';
import { useState } from 'react';

describe('FancyModal', () => {
  it('should render successfully', () => {
    const [isModalShown, setIsModalShown] = useState(false);
    const { baseElement } = render(
      <FancyModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        title="Test title"
      ></FancyModal>
    );
    expect(baseElement).toBeTruthy();
  });
});

'use client';

import FancyButton from '../fancy-button/fancy-button';
import { BellIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import FancyModal from '../fancy-modal/fancy-modal';

export function NotificationsButton() {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <FancyButton
        isPrimary
        onClick={() => {
          setIsModalShown(true);
        }}
      >
        <BellIcon className="block h-4 w-4" />
      </FancyButton>

      <FancyModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        title="Уведомления"
      ></FancyModal>
    </>
  );
}

export default NotificationsButton;

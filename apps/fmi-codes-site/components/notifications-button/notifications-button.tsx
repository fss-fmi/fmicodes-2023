import { BellIcon } from '@heroicons/react/24/outline';
import FancyModal from '../fancy-modal/fancy-modal';

export function NotificationsButton() {
  return (
    <>
      <FancyModal
        title="Покани от отбори"
        openButtonContent={<BellIcon className="h-5 w-5" />}
      ></FancyModal>
    </>
  );
}

export default NotificationsButton;

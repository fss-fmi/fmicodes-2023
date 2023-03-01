import { ReactNode } from 'react';
import DiscordWidget from '../../components/discord-widget/discord-widget';
import FancyHeading from '../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/profile" page.
 * @return {ReactNode} Profile page component.
 * @constructor
 */
export default function ProfilePage(): ReactNode {
  return (
    <div className="profile-page">
      <FancyHeading title="Профил" />

      {/* @ts-expect-error Server Component */}
      <DiscordWidget />
    </div>
  );
}

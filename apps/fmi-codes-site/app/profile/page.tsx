import { ReactNode } from 'react';
import DiscordWidget from '../../components/discord-widget/discord-widget';

/**
 * Defines the "/profile" page.
 * @return {ReactNode} Profile page component.
 * @constructor
 */
export default function ProfilePage(): ReactNode {
  return (
    <div className="profile-page">
      <h1>Profile</h1>

      {/* @ts-expect-error Server Component */}
      <DiscordWidget />
    </div>
  );
}

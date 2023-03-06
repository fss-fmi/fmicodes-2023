import { getServerSession } from 'next-auth';
import { getUserBySession } from '../../pages/api/users/self';
import FancyLink from '../fancy-link/fancy-link';

export async function DiscordWidget() {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  const user = await getUserBySession(session);

  if (!user || user.discordId) {
    return null;
  }

  return (
    <div className="acrylic w-full flex justify-between rounded-lg p-6">
      <>
        <div className="grid">
          <span className="text-sm">Код за верификация</span>
          <h3 className="text-2xl font-bold text-white">
            {user.discordVerificationCode}
          </h3>
        </div>
        <div className="flex content-center items-center space-x-2">
          <FancyLink isPrimary href={String(process.env.DISCORD_SERVER_INVITE)}>
            Влезте в Discord сървъра
          </FancyLink>
        </div>
      </>
    </div>
  );
}

export default DiscordWidget;

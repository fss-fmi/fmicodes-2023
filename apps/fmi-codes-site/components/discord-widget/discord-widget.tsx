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
    <div className="w-full flex justify-between bg-white rounded-lg p-6 dark:border dark:bg-gray-800 dark:border-gray-700">
      <>
        <div className="grid">
          <span className="text-sm">Код за верификация</span>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user.discordVerificationCode}
          </h3>
        </div>
        <div className="flex content-center items-center space-x-2">
          <FancyLink isPrimary href="https://discord.gg/NU9tBQHTHQ">
            Влезте в Discord сървъра
          </FancyLink>
        </div>
      </>
    </div>
  );
}

export default DiscordWidget;

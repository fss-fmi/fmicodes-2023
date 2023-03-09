import { getServerSession } from 'next-auth';
import { getUserBySession } from '../../pages/api/users/self';
import FancyLink from '../fancy-link/fancy-link';

export async function DiscordWidget() {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  const user = await getUserBySession(session);

  if (!user) {
    return null;
  }

  return (
    <div className="w-full flex justify-between rounded-lg p-4 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-10">
      <>
        {user.discordId ? (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-white">
              Вие сте влезли в Discord сървъра
            </h3>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <span className="text-sm">Код за верификация</span>
              <h3 className="text-2xl font-bold text-white">
                {user.discordVerificationCode}
              </h3>
            </div>
          </>
        )}
        <div className="flex content-center items-center space-x-2">
          <FancyLink
            isPrimary
            target="_blank"
            href={String(process.env.DISCORD_SERVER_INVITE)}
          >
            {user.discordId ? 'Линк към сървъра' : 'Влезте в Discord сървъра'}
          </FancyLink>
        </div>
      </>
    </div>
  );
}

export default DiscordWidget;

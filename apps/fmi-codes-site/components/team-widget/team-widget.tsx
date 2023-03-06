import { getServerSession } from 'next-auth';
import { getTeamBySession } from '../../pages/api/teams/self';
import FancyLink from '../fancy-link/fancy-link';
import NotificationsButton from '../notifications-button/notifications-button';

export async function TeamWidget() {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  const team = await getTeamBySession(session);

  return (
    <div className="w-full flex acrylic justify-between rounded-lg p-6">
      {team ? (
        <>
          <div className="">
            <span className="text-sm">Вие сте част от отбор</span>
            <h3 className="text-2xl font-bold text-white">{team.name}</h3>
          </div>
          <div className="flex content-center items-center space-x-2">
            <NotificationsButton />
            <FancyLink isPrimary href="/teams/self">
              Прегледай отбора
            </FancyLink>
          </div>
        </>
      ) : (
        <>
          <div className="grid">
            <span className="text-sm">Вие все още</span>
            <h3 className="text-2xl font-bold text-white">Нямате отбор</h3>
          </div>
          <div className="flex content-center items-center space-x-2">
            <NotificationsButton />
            <FancyLink isPrimary href="/teams/create">
              Създайте отбор
            </FancyLink>
          </div>
        </>
      )}
    </div>
  );
}

export default TeamWidget;

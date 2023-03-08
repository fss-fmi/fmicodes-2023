import { BellIcon } from '@heroicons/react/24/outline';
import FancyModal from '../fancy-modal/fancy-modal';
import { getTeamInvitations } from '../../pages/api/team-invitations';
import { getServerSession } from 'next-auth';
import { getUserBySession } from '../../pages/api/users/self';
import Link from 'next/link';
import AcceptInviteButton from '../accept-invite-button/accept-invite-button';
import DeclineInviteButton from '../decline-invite-button/decline-invite-button';

export async function NotificationsButton() {
  const session = await getServerSession();
  if (!session) {
    return null;
  }

  const user = await getUserBySession(session);
  if (!user) {
    return null;
  }

  const teamInvites = await getTeamInvitations(user.id);
  return (
    <>
      <FancyModal
        title="Покани от отбори"
        openButtonContent={<BellIcon className="h-5 w-5" />}
      >
        <div className="flex flex-col space-y-2 w-full h-64 overflow-y-auto">
          {teamInvites.length === 0 ? (
            <div className="px-4 mt-2 py-2 text-md text-white border border-gray-700 rounded-lg bg-gray-800 bg-opacity-10">
              Все още нямате покани от отбори. 🥲
            </div>
          ) : null}

          {teamInvites.map((invite, i) => (
            <div
              key={i}
              className="flex flex-row space-x-2 space-y-1 max-h-20 p-2 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-10"
            >
              <div className="flex flex-col grow">
                <span className="text-sm">Покана от отбор</span>
                <Link href={`/teams/${invite.team.id}`}>
                  <h3 className="text-lg font-bold text-white underline">
                    {invite.team.name}
                  </h3>
                </Link>
              </div>
              <div className="flex flex-row space-x-1">
                <AcceptInviteButton invite={invite} />
                <DeclineInviteButton invite={invite} />
              </div>
            </div>
          ))}
        </div>
      </FancyModal>
    </>
  );
}

export default NotificationsButton;

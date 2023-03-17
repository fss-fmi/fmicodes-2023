import { ReactNode } from 'react';
import FancyHeading from '../../components/fancy-heading/fancy-heading';
import { getSchedule } from '../../pages/api/schedule';

/**
 * Defines the "/schedule" page.
 * @return {ReactNode} Schedule page component.
 * @constructor
 */
export default async function SchedulePage(): Promise<ReactNode> {
  const schedule = await getSchedule();

  return (
    <div className="schedule-page">
      <FancyHeading title="Програма" />

      <div className="h-2/3 grid place-items-center">
        <div className="w-full acrylic rounded-lg md:mt-0 sm:max-w-6xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <ol className="relative border-l border-gray-200">
              {schedule.map((event, i) => (
                <li key={i} className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                  <time className="mb-1 text-md font-normal leading-none text-gray-400">
                    🕑{' '}
                    {event.startsAt.toLocaleString('bg-BG', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {event.endsAt && (
                      <>
                        {' '}
                        -{' '}
                        {event.endsAt.toLocaleString('bg-BG', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </>
                    )}
                  </time>
                  {event.location && (
                    <p className="mb-1 text-base font-normal text-gray-400">
                      📍 {event.location}
                    </p>
                  )}
                  <h3 className="text-lg font-semibold text-white">
                    {event.title}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-400">
                    {event.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

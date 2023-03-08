import { ReactNode } from 'react';
import DiscordWidget from '../../components/discord-widget/discord-widget';
import FancyHeading from '../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/discord" page.
 * @return {ReactNode} Discord page component.
 * @constructor
 */
export default function DiscordPage(): ReactNode {
  return (
    <>
      <FancyHeading title="Discord сървър" />
      <div className="h-2/3 grid place-items-center">
        <div className="w-full acrylic rounded-lg md:mt-0 sm:max-w-6xl xl:p-0">
          <div className="p-6 space-y-2 sm:p-8">
            <h3 className="text-xl font-bold md:text-2xl text-white">
              {'Discord сървър на FMI{Codes} 2023'}
            </h3>
            <p>
              ❓ Как да получите достъп до каналите в сървъра?
              <br />
              🔸 При влизане в сървъра, отидете в канала{' '}
              <span className="bg-gray-900 p-0.5 rounded-lg">
                #👮︱верификация
              </span>
              <br />
              🔸 Въведете{' '}
              <span className="bg-gray-900 p-0.5 rounded-lg">/auth</span>{' '}
              командата с 8-цифрен код, който виждате по-долу.
              <br />
              🔸 След въвеждане на кода, автоматично ще получите достъп до
              каналите на Вашия отбор.
            </p>
          </div>

          <div className="flex items-center p-4 space-x-4">
            {/* @ts-expect-error Serverside component */}
            <DiscordWidget />
          </div>
        </div>
      </div>
    </>
  );
}

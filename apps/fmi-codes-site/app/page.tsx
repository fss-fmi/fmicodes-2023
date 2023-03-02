import { ReactNode } from 'react';
import HeroLogo from '../components/hero-logo/hero-logo';
import FancyHeading from '../components/fancy-heading/fancy-heading';
import Countdown from '../components/countdown/countdown';

/**
 * Defines the home page.
 * @return {ReactNode} Home page component.
 * @constructor
 */
export default function HomePage(): ReactNode {
  return (
    <div className="h-screen">
      <div className="absolute flex top-0 left-0 w-full h-full items-center justify-center">
        <div className="flex flex-col gap-2 z-10 text-red-600">
          <FancyHeading
            title={'FMI{Codes} 2023'}
            isRoman={true}
            containsNumbers={true}
          />
          <p className="w-full text-center">ДО НАЧАЛОТО:</p>
          <Countdown targetDate={new Date('2023-03-17:17:00')} />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <HeroLogo />
      </div>
    </div>
  );
}

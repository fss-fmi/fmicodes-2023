import { ReactNode } from 'react';
import HeroLogo from '../components/hero-logo/hero-logo';
import Countdown from '../components/countdown/countdown';
import Image from 'next/image';

/**
 * Defines the home page.
 * @return {ReactNode} Home page component.
 * @constructor
 */
export default function HomePage(): ReactNode {
  return (
    <div className="h-screen">
      <div className="absolute flex top-0 left-0 w-full h-full items-end justify-center">
        <div className="flex flex-row gap-12 z-10 text-red-600 mb-8">
          <div className="flex flex-col gap-2">
            <span className="w-full text-center">ДО НАЧАЛОТО:</span>
            <Countdown targetDate={'2023/03/17 17:00:00'} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="w-full text-center">ОРГАНИЗИРАНО С ❤️ OT:</span>
            <Image
              src="/images/fss-logo.png"
              alt="Лого на ФСС"
              width={180}
              height={180}
            />
          </div>
        </div>
      </div>
      <HeroLogo />
    </div>
  );
}

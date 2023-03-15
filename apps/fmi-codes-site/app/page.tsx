import { ReactNode } from 'react';
import Countdown from '../components/countdown/countdown';
import Image from 'next/image';
import HeroLogo from '../components/hero-logo/hero-logo';
import FancyHeading from '../components/fancy-heading/fancy-heading';
import { getSponsors } from '../pages/api/sponsors';
import { SponsorType } from '@prisma/client';
import HoverCard from '../components/hover-card/hover-card';
import Link from 'next/link';

/**
 * Defines the home page.
 * @return {ReactNode} Home page component.
 * @constructor
 */
export default async function HomePage(): Promise<ReactNode> {
  const sponsors = await getSponsors();
  const goldSponsors = sponsors.filter(
    (sponsor) => sponsor.type === SponsorType.GOLD
  );
  const silverSponsors = sponsors.filter(
    (sponsor) => sponsor.type === SponsorType.SILVER
  );
  const bronzeSponsors = sponsors.filter(
    (sponsor) => sponsor.type === SponsorType.BRONZE
  );
  return (
    <>
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
      <div>
        <FancyHeading title="Златни спонсори" />
        <div className="flex flex-wrap w-full h-full justify-center">
          {goldSponsors.map((sponsor, i) => (
            <HoverCard
              key={i}
              title={sponsor.name}
              image={sponsor.logo}
              subtitle={sponsor.description}
              link={sponsor.website}
              borderColor="gold"
            />
          ))}
        </div>

        <FancyHeading title="Сребрени спонсори" />

        <div className="flex flex-wrap w-full h-full justify-center">
          {silverSponsors.map((sponsor, i) => (
            <Link key={i} target="_blank" href={sponsor.website}>
              <HoverCard
                key={i}
                title={sponsor.name}
                image={sponsor.logo}
                subtitle={sponsor.description}
                link={sponsor.website}
                borderColor="silver"
              />
            </Link>
          ))}

          <FancyHeading title="Бронзови спонсори" />

          <div className="flex flex-wrap w-full h-full justify-center">
            {bronzeSponsors.map((sponsor, i) => (
              <Link key={i} target="_blank" href={sponsor.website}>
                <HoverCard
                  key={i}
                  title={sponsor.name}
                  image={sponsor.logo}
                  subtitle={sponsor.description}
                  link={sponsor.website}
                  borderColor="darkorange"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

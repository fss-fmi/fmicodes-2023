import { ReactNode } from 'react';
import TeamCard from '../../components/team-card/team-card';

/**
 * Defines the "/teams" page.
 * @return {ReactNode} Teams page component.
 * @constructor
 */
export default function TeamsPage(): ReactNode {
  return (
    <div className="teams-page">
      <h1>Teams</h1>
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
        {[...Array(100).keys()].map((_, i) => (
          <TeamCard
            key={i}
            image="/images/team-banner-temp.jpeg"
            name="GOSHO"
            roaster={[
              'Гошо Лошо',
              'Лошо Гошо',
              'Пошо Лошо',
              'Мошо Тошо',
              'Тошо Гошо',
            ]}
            technologies={['React', 'NextJS', 'TypeScript', 'TailwindCSS']}
          />
        ))}
      </div>
    </div>
  );
}

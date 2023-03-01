import { ReactNode } from 'react';
import FancyHeading from '../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/ranking" page.
 * @return {ReactNode} Ranking page component.
 * @constructor
 */
export default function RankingPage(): ReactNode {
  return (
    <div className="mentors-page">
      <FancyHeading title="Класация" />
    </div>
  );
}

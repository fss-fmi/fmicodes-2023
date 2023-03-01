import { ReactNode } from 'react';
import FancyHeading from '../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/mentors" page.
 * @return {ReactNode} Mentors page component.
 * @constructor
 */
export default function AboutPage(): ReactNode {
  return (
    <div className="mentors-page">
      <FancyHeading title="Ментори" />
    </div>
  );
}

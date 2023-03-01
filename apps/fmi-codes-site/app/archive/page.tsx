import { ReactNode } from 'react';
import FancyHeading from '../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/archive" page.
 * @return {ReactNode} Archive page component.
 * @constructor
 */
export default function AboutPage(): ReactNode {
  return (
    <div className="archive-page">
      <FancyHeading title="Архив" />
    </div>
  );
}

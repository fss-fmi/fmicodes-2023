import { ReactNode } from 'react';
import FancyHeading from '../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/regulation" page.
 * @return {ReactNode} Regulation page component.
 * @constructor
 */
export default function RegulationPage(): ReactNode {
  return (
    <div className="regulation-page">
      <FancyHeading title="Регламент" />
    </div>
  );
}

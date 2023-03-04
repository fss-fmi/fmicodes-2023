import { ReactNode } from 'react';
import FancyHeading from '../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/about" page.
 * @return {ReactNode} About page component.
 * @constructor
 */
export default function AboutPage(): ReactNode {
  return (
    <div className="about-page">
      <FancyHeading title="За хакатона" />
    </div>
  );
}

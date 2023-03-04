'use client';
import { ReactNode } from 'react';
import FancyHeading from '../../components/fancy-heading/fancy-heading';

/**
 * Defines the "/schedule" page.
 * @return {ReactNode} Schedule page component.
 * @constructor
 */
export default function SchedulePage(): ReactNode {
  return (
    <div className="schedule-page">
      <FancyHeading title="Програма" />
    </div>
  );
}

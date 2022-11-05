import {ReactNode} from 'react';

/**
 * Defines the home page.
 * @return {ReactNode} Home page component.
 * @constructor
 */
export default function HomePage() : ReactNode {
  return (
    <div>
      <h1 className="text-red-600 font-bold underline">Hello World</h1>
    </div>
  );
}

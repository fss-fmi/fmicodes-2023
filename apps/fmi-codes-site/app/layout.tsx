import {ReactNode} from 'react';
import '../styles/globals.css';
import Navbar from '../components/Navbar/Navbar';

/**
 * Defines the layout of the application.
 * @param {RootLayout} children Children of the layout.
 * @return {RootLayout} Layout of the application.
 * @constructor
 */
export default function RootLayout({
  children,
}: {
    children: ReactNode
}): ReactNode {
  return (
    <html>
      <head>
        <title>FMICodes</title>
      </head>
      <body>
        <Navbar />
        <div className="mx-auto max-w-7xl px-2">
          {children}
        </div>
        {/* <Footer />*/}
      </body>
    </html>
  );
}

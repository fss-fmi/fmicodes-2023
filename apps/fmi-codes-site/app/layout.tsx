import '../styles/globals.css';
import { ReactNode } from 'react';
import BackgroundBlob from '../components/background-blob/background-blob';

/**
 * Defines the layout of the application.
 * @param {RootLayout} children Children of the layout.
 * @return {RootLayout} Layout of the application.
 * @constructor
 */
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <html>
      <head>
        <title>{'FMI{Codes} 2023'}</title>
      </head>
      <body>
        <BackgroundBlob />
        {/*<Navbar />*/}
        <div className="mx-auto">{children}</div>
        {/* <Footer />*/}
      </body>
    </html>
  );
}

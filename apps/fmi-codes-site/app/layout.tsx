import { ReactNode } from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import Navbar from '../components/navbar/Navbar';

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
      <Head>
        <title>FMICodes</title>
      </Head>
      <body>
        <Navbar />
        <div className="mx-auto max-w-7xl px-2">{children}</div>
        {/* <Footer />*/}
      </body>
    </html>
  );
}

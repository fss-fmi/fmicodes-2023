'use client';

import '../styles/globals.css';
import { ReactNode } from 'react';
import BackgroundBlob from '../components/background-blob/background-blob';
import Navbar from '../components/navbar/navbar';
import CookieConsent from './cookie-consent/cookie-consent';

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
      <body className="h-screen">
        <Navbar />
        <BackgroundBlob />
        <div className="h-screen max-w-7xl m-auto p-2">
          <div className="h-16" />
          {children}
        </div>
        <CookieConsent />
        {/* <Footer />*/}
      </body>
    </html>
  );
}

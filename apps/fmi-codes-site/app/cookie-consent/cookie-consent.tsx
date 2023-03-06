'use client';

import ReactCookieConsent from 'react-cookie-consent';
import Link from 'next/link';

export function CookieConsent() {
  return (
    <ReactCookieConsent
      buttonText="OK"
      containerClasses="acrylic"
      style={{
        right: '10px',
        width: '17.5rem',
        border: 'solid 1px rgb(239, 68, 68)',
        borderRadius: '1rem',
        background: 'rgba(50,50,50,0.5)',
        marginBottom: '2rem',
        marginLeft: 'auto',
        marginRight: '1rem',
      }}
      contentStyle={{
        display: 'inline',
        flexWrap: 'wrap',
        marginLeft: '1rem',
        overflow: 'wrap',
      }}
      buttonStyle={{
        background: 'rgb(185, 25, 25)',
        fontSize: '13px',
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '0.5rem',
      }}
    >
      Този уебсайт използва бисквитки. Научете повече{' '}
      <Link className="underline" href="/regulation">
        тук
      </Link>
      .
    </ReactCookieConsent>
  );
}

export default CookieConsent;

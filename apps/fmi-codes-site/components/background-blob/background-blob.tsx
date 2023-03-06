'use client';

import useMousePosition from '../../lib/use-mouse-position';
import styles from './background-blob.module.scss';
import { useRef } from 'react';

export function BackgroundBlob() {
  const mousePosition = useMousePosition();
  const blobRef = useRef<HTMLDivElement>(null);

  const blob = blobRef.current;
  if (blob) {
    blob.animate(
      {
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
      },
      { duration: 2000, fill: 'forwards' }
    );
  }

  return (
    <div id="blobcho" className={styles.container}>
      <div ref={blobRef} className={styles.blob}></div>
    </div>
  );
}

export default BackgroundBlob;

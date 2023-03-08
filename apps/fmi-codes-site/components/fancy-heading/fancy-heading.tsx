'use client';

import { useEffect, useRef } from 'react';

export interface FancyHeadingProps {
  title: string;
  isRoman?: boolean;
  containsNumbers?: boolean;
}

export function FancyHeading(props: FancyHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const letters =
    (props.isRoman
      ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      : 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЬЮЯ') +
    (props.containsNumbers ? '0123456789' : '');

  useEffect(() => {
    const textEffect = () => {
      let iterations = 0;

      const interval = setInterval(() => {
        if (headingRef.current !== null) {
          headingRef.current.innerText = headingRef.current.innerText
            .split('')
            .map((letter, index) => {
              if (letter === ' ') {
                return letter;
              }

              if (index < iterations) {
                return props.title[index].toUpperCase();
              }

              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join('');

          if (iterations >= props.title.length) {
            clearInterval(interval);
          }

          iterations += 1 / 3;
        }
      }, 50);
    };

    if (headingRef.current !== null) {
      textEffect();
      headingRef.current.onclick = textEffect;
    }
  }, []);

  return (
    <h1
      ref={headingRef}
      className="text-4xl sm:text-6xl font-black capitalize my-4 truncate text-clip"
    >
      {props.title.toUpperCase()}
    </h1>
  );
}

export default FancyHeading;

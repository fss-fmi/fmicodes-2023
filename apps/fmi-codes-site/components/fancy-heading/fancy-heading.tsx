'use client';

import { useRef } from 'react';

export interface FancyHeadingProps {
  title: string;
}

export function FancyHeading(props: FancyHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const letters = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ';

  if (headingRef.current) {
    const textEffect = () => {
      let iterations = 0;

      const interval = setInterval(() => {
        // @ts-expect-error TODO: idk tbh, it works fine
        headingRef.current.innerText = headingRef.current.innerText
          .split('')
          .map((letter, index) => {
            if (index < iterations) {
              return props.title[index].toUpperCase();
            }

            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('');

        if (iterations >= props.title.length) {
          clearInterval(interval);
        }

        iterations += 1 / 4;
      }, 30);
    };

    textEffect();
    headingRef.current.onmouseover = textEffect;
  }

  return (
    <h1 ref={headingRef} className="text-5xl font-black capitalize">
      {props.title.toUpperCase()}
    </h1>
  );
}

export default FancyHeading;

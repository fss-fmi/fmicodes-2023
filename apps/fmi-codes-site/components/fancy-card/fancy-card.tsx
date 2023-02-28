'use client';

import styles from './fancy-card.module.scss';
import React, { useRef } from 'react';
import Image from 'next/image';
import useMousePosition from '../../lib/use-mouse-position';

export interface FancyCardProps {
  image: string;
  title: string;
  content: JSX.Element;
}

export function FancyCard(props: FancyCardProps) {
  const mousePosition = useMousePosition();
  const fancyCardRef = useRef<HTMLDivElement>(null);

  const fancyCard = fancyCardRef.current;
  const constrain = 60;
  if (fancyCard && mousePosition.x && mousePosition.y) {
    const box = fancyCard.getBoundingClientRect();
    const calcX = (-(mousePosition.y - box.y - box.height / 2) / constrain) * 3;
    const calcY = (mousePosition.x - box.x - box.width / 2) / constrain;
    fancyCard.animate(
      {
        transform: `rotateX(${calcX}deg) rotateY(${calcY}deg)`,
      },
      { duration: 2000, fill: 'forwards' }
    );
  }

  return (
    <div ref={fancyCardRef} className="bg-gray-800 rounded-md">
      <Image
        className="w-full h-full object-cover rounded-t-md"
        src={props.image}
        alt={props.title}
        width={500}
        height={500}
      />
      <div className="p-4">
        <h2 className="font-semibold text-2xl">{props.title}</h2>

        <div className="p-2">
          <div className={styles['content']}>{props.content}</div>
        </div>
      </div>
    </div>
  );
}

export default FancyCard;

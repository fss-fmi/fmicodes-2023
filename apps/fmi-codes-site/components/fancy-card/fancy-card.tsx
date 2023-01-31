import styles from './fancy-card.module.scss';
import React from 'react';
import Image from 'next/image';

export interface FancyCardProps {
  image: string;
  title: string;
  content: JSX.Element;
}

export function FancyCard(props: FancyCardProps) {
  return (
    <div className="bg-gray-800 rounded-md">
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

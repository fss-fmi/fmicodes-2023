import styles from './hover-card.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export interface HoverCardProps {
  title: string;
  image?: string;
  subtitle: string;
  link: string;
  borderColor: string;
}

export function HoverCard(props: HoverCardProps) {
  return (
    <Link className="m-4" target="_blank" href={props.link}>
      <div
        className={styles['card'] + ' acrylic'}
        style={{ borderColor: props.borderColor }}
      >
        <div className={styles['card-content']}>
          <h3 className={styles['card-title']}>
            {props.image && (
              <Image
                src={props.image}
                alt={`Лого на ${props.title}`}
                width={100}
                height={100}
              />
            )}
          </h3>
          <h4 className={styles['card-subtitle']}>
            {props.subtitle.split(' ').map((word, i) => (
              <span key={i} className={styles['card-subtitle-word']}>
                {word}
              </span>
            ))}
          </h4>
        </div>
      </div>
    </Link>
  );
}

export default HoverCard;

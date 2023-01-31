import styles from './team-card.module.css';
import FancyCard from '../fancy-card/fancy-card';

export interface TeamCardProps {
  image: string;
  name: string;
  roaster: string[];
  technologies: string[];
}

export function TeamCard(props: TeamCardProps) {
  return (
    <div className={styles.container}>
      <FancyCard
        image={props.image}
        title={`Отбор "${props.name}"`}
        content={CardContent(props.roaster, props.technologies)}
      />
    </div>
  );
}

function CardContent(roaster: string[], technologies: string[]) {
  return (
    <div className={styles['card-content']}>
      <div className={styles['card-content__roaster']}>
        <h3 className="font-bold">Участници</h3>
        <ul>
          {roaster.map((member, i) => (
            <li key={i}>{member}</li>
          ))}
        </ul>
      </div>
      <div className={styles['card-content__technologies']}>
        <h3 className="font-bold">Технологии</h3>
        <ul>
          {technologies.map((tech, i) => (
            <li
              className="bg-red-500 inline-block rounded-xl px-2 py-1 mr-2"
              key={i}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default TeamCard;

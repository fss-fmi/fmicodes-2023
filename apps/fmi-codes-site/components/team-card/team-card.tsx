import FancyCard from '../fancy-card/fancy-card';
import { Technology } from '@prisma/client';
import styles from './team-card.module.css';
import TechnologiesShowcase from '../technologies-showcase/technologies-showcase';

export interface TeamCardProps {
  id: number;
  image: string;
  name: string;
  roaster: string[];
  room: string | null;
  projectName: string | null;
  projectDescription: string | null;
  projectTechnologies: Technology[];
}

export function TeamCard(props: TeamCardProps) {
  return (
    <div className={styles.container}>
      <FancyCard
        image={props.image}
        title={`Отбор "${props.name}"`}
        url={`/teams/${props.id}`}
        content={CardContent(
          props.roaster,
          props.room,
          props.projectName,
          props.projectDescription,
          props.projectTechnologies
        )}
      />
    </div>
  );
}

function CardContent(
  roaster: string[],
  room: string | null,
  projectName: string | null,
  projectDescription: string | null,
  projectTechnologies: Technology[]
) {
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

      {room ? (
        <div className={styles['card-content__room']}>
          <h3 className="font-bold">Зала</h3>
          <p>{room}</p>
        </div>
      ) : null}

      {projectName && projectDescription ? (
        <div className={styles['card-content__project']}>
          <h3 className="font-bold">{`Проект "${projectName}"`}</h3>
          <p className="line-clamp-3">{projectDescription}</p>
        </div>
      ) : null}

      {projectTechnologies.length > 0 ? (
        <div>
          <h3 className="font-bold">Технологии</h3>
          <TechnologiesShowcase technologies={projectTechnologies} />
        </div>
      ) : null}
    </div>
  );
}

export default TeamCard;

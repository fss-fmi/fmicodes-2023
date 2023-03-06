import FancyCard from '../fancy-card/fancy-card';
import { Technology } from '@prisma/client';
import styles from './team-card.module.css';

export interface TeamCardProps {
  id: number;
  image: string;
  name: string;
  roaster: string[];
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
      {projectName && projectDescription ? (
        <div className={styles['card-content__project']}>
          <h3 className="font-bold">{`Проект "${projectName}"`}</h3>
          <p className="line-clamp-3">{projectDescription}</p>
        </div>
      ) : null}
      <div className={styles['card-content__technologies']}>
        <h3 className="font-bold">Технологии</h3>
        <ul>
          {projectTechnologies.map((tech, i) => (
            <li
              style={{ backgroundColor: tech.color }}
              className="inline-block rounded-xl px-2 py-1 mr-2"
              key={i}
            >
              {tech.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamCard;

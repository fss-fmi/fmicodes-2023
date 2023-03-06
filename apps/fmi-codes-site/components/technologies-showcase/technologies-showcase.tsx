import { Technology } from '@prisma/client';

export interface TechnologiesShowcaseProps {
  technologies: Technology[];
}

export function TechnologiesShowcase(props: TechnologiesShowcaseProps) {
  return (
    <ul className="flex flex-wrap space-1 justify-between">
      {props.technologies.map((tech, i) => (
        <li
          style={{ backgroundColor: tech.color }}
          className="inline-block rounded-xl px-2.5 py-1 m-0.5"
          key={i}
        >
          {tech.name}
        </li>
      ))}
    </ul>
  );
}

export default TechnologiesShowcase;

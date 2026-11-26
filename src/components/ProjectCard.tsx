import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  const path = `/projects/${project.slug}`;
  return <article className="project-card">
    <p className="section-label">{project.category} · {project.status}</p>
    <h3><Link to={path}>{project.title}</Link></h3>
    <p>{project.summary}</p>
    <ul className="tech-row" aria-label="Technologies">
      {project.technologies.slice(0, 4).map(technology => <li key={technology}>{technology}</li>)}
    </ul>
  </article>;
}

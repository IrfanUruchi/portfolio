import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import ProjectCard from '../components/ProjectCard';
import PublicStats from '../components/PublicStats';
import { iulinuxRelease as release } from '../data/iulinux';
import { projects } from '../data/projects';
import { researchOutputs } from '../data/research';

const selectedProjects = [
  projects.find(project => project.slug === 'multi-gpu-ai-orchestrator'),
  projects.find(project => project.featuredGroup === 'AI Research and Models'),
  projects.find(project => project.featuredGroup === 'Distributed and Infrastructure Systems'),
].filter(project => project !== undefined);

export default function Home() {
  return <>
    <Seo title="Computer Engineer" description="Irfan Uruçi builds operating-system, machine-learning, distributed, and application systems." />
    <section className="hero shell">
      <div>
        <p className="eyebrow">Computer Engineer</p>
        <h1>Irfan Uruçi</h1>
        <p className="lede">I build operating-system tooling, model inference infrastructure, distributed systems, and applications. My machine learning research focuses on model adaptation, evaluation, and deployment.</p>
        <div className="actions">
          <Link className="button primary" to="/projects">Engineering projects</Link>
          <Link className="button secondary" to="/research">Research & publications</Link>
        </div>
      </div>
    </section>
    <section className="shell">
      <div className="showcase">
        <div className="showcase-copy">
          <p className="eyebrow">Operating systems · Public Beta</p>
          <h2>{release.name}</h2>
          <p>An independent Linux workstation distribution built on Ubuntu 26.04 LTS and KDE Plasma, with native system settings, signed software distribution, and configuration recovery.</p>
          <Link className="button secondary" to="/iulinux">View the engineering project</Link>
        </div>
        <img src={release.screenshot} alt={release.screenshotAlt} width="2048" height="1276" fetchPriority="high" />
      </div>
    </section>
    <PublicStats />
    <section className="shell section">
      <div className="section-head"><h2>Selected engineering projects</h2><Link className="text-link" to="/projects">All projects</Link></div>
      <div className="project-grid home-projects">
        {selectedProjects.map(project => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </section>
    <section className="section soft">
      <div className="shell">
        <div className="section-head"><h2>Selected research</h2><Link className="text-link" to="/research">All publications</Link></div>
        <div className="research-summary">
          {researchOutputs.slice(0, 3).map(item => <article key={item.slug}>
            <p className="section-label">{item.type} · {item.date.slice(0, 4)}</p>
            <h3><Link to={`/research/${item.slug}`}>{item.title}</Link></h3>
          </article>)}
        </div>
      </div>
    </section>
  </>;
}

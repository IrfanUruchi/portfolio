import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { researchArtifacts } from '../data/research';

export default function Models(){return <><Seo title="Models & Experiments" description="Model releases and experimental engineering records by Irfan Uruchi." path="/models"/><header className="page-head shell"><h1>Models & Experiments</h1><p>Model releases, datasets, and experimental engineering records.</p></header><section className="shell section"><div className="artifact-grid">{researchArtifacts.map(item=><article key={item.title}><p className="section-label">{item.kind}</p><h2>{item.title}</h2><p>{item.summary}</p><div className="research-links">{item.links.map(link=><a className="text-link" href={link.url} key={link.url}>{link.label}</a>)}{item.relatedProject&&<Link className="text-link" to={`/projects/${item.relatedProject}`}>Engineering record</Link>}</div></article>)}</div></section></>}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { siteConfig } from '../config';
import { iulinuxBook as book } from '../data/books';
import { researchArtifacts, researchOutputs } from '../data/research';

const types = ['All', ...new Set(researchOutputs.map((item) => item.type))];

export default function Research() {
  const [type, setType] = useState('All');
  const papers = researchOutputs.filter((item) => type === 'All' || item.type === type);

  return <>
    <Seo title="Research & Publications" description="Zenodo reports and preprints by Irfan Uruchi, with associated engineering work and artifacts." path="/research" />
    <header className="page-head shell"><p className="eyebrow">Research & publications</p><h1>Research papers and technical publications.</h1><p>Zenodo-deposited reports and preprints, connected to the engineering work and artifacts that support them.</p></header>
    <section className="shell section">
      <div className="archive-intro"><div><p className="section-label">Research papers</p><h2>Publications</h2></div><p>{researchOutputs.length} unique Zenodo records by Irfan Uruchi.</p></div>
      <fieldset className="filter-bar"><legend>Publication type</legend>{types.map((value) => <button className={type === value ? 'selected' : ''} key={value} onClick={() => setType(value)} aria-pressed={type === value}>{value} ({value === 'All' ? researchOutputs.length : researchOutputs.filter((item) => item.type === value).length})</button>)}</fieldset>
      <p className="filter-result">Showing {papers.length} publication{papers.length === 1 ? '' : 's'}.</p>
      <div className="research-list">{papers.map((item) => <article className="research-entry" key={item.slug}><div className="research-meta"><span>{item.type}</span><span>{item.date.slice(0, 4)}</span><span>{item.license}</span></div><div><h2><Link to={`/research/${item.slug}`}>{item.title}</Link></h2><p className="byline">{item.authors} · {item.date}</p><p>{item.abstract}</p><p className="doi"><a href={`https://doi.org/${item.doi}`}>DOI: {item.doi} ↗</a></p><div className="research-links"><a className="text-link" href={item.pdfUrl}>PDF ↗</a><a className="text-link" href={item.recordUrl}>Zenodo ↗</a><Link className="text-link" to={`/research/${item.slug}`}>Publication details →</Link>{item.relatedProject && <Link className="text-link" to={`/projects/${item.relatedProject}`}>Related project →</Link>}</div></div></article>)}</div>
    </section>
    <section className="book-feature soft"><div className="shell book-feature-content"><img src="/assets/books/iulinux-v0.3.5-cover.png" alt={`Published cover of ${book.title}`} /><div><p className="section-label">Engineering book</p><h2>{book.title}</h2><p>{book.author} · November 2026 · v{book.edition}</p><p>{book.type}. {book.pages} pages · {book.chapterCount} chapters · {book.references} references.</p><div className="research-links"><Link className="text-link" to="/books/iulinux">Book details →</Link><a className="text-link" href={book.pdf}>PDF ↗</a><a className="text-link" href={`https://doi.org/${book.editionDoi}`}>Edition DOI ↗</a></div></div></div></section>
    <section className="soft section"><div className="shell"><p className="section-label">Related research artifacts</p><h2>Models, datasets, and experimental work.</h2><p>These public artifacts are associated with research and engineering work but are not presented as research papers.</p><div className="artifact-grid">{researchArtifacts.map((item) => <article key={item.title}><p className="section-label">{item.kind}</p><h3>{item.title}</h3><p>{item.summary}</p><div className="research-links">{item.links.map((link) => <a className="text-link" href={link.url} key={link.url}>{link.label} ↗</a>)}{item.relatedProject && <Link className="text-link" to={`/projects/${item.relatedProject}`}>Engineering record →</Link>}</div></article>)}</div><div className="research-links"><a className="text-link" href={siteConfig.huggingFace}>Hugging Face models ↗</a><a className="text-link" href={`${siteConfig.huggingFace}/datasets`}>Hugging Face datasets ↗</a></div></div></section>
  </>;
}

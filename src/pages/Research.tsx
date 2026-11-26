import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { iulinuxBook as book } from '../data/books';
import { iulinuxPublicationsPath } from '../data/iulinux';
import { researchOutputs } from '../data/research';

const types = ['All', ...new Set(researchOutputs.map((item) => item.type))];

export default function Research() {
  const [type, setType] = useState('All');
  const papers = researchOutputs.filter((item) => type === 'All' || item.type === type);

  return <>
    <Seo title="Research & Publications" description="Research publications by Irfan Uruchi." path="/research" />
    <header className="page-head shell"><h1>Research & Publications</h1><p>Research in artificial intelligence, distributed systems, edge computing, and software engineering.</p></header>
    <section className="shell section">
      <div className="archive-intro"><div><h2>Publications</h2></div></div>
      <fieldset className="filter-bar"><legend>Publication type</legend>{types.map((value) => <button className={type === value ? 'selected' : ''} key={value} onClick={() => setType(value)} aria-pressed={type === value}>{value} ({value === 'All' ? researchOutputs.length : researchOutputs.filter((item) => item.type === value).length})</button>)}</fieldset>
      {type!=='All'&&<p className="filter-result" role="status">{papers.length} publication{papers.length === 1 ? '' : 's'}.</p>}
      <div className="research-list">{papers.map((item) => <article className="research-entry" key={item.slug}><div className="research-meta"><span>{item.type}</span><span>{item.date.slice(0, 4)}</span><span>{item.license}</span></div><div><h2><Link to={`/research/${item.slug}`}>{item.title}</Link></h2><p className="byline">{item.authors} · {item.date}</p><p>{item.abstract}</p><p className="doi"><a href={`https://doi.org/${item.doi}`}>DOI: {item.doi}</a></p><div className="research-links"><a className="text-link" href={item.pdfUrl}>PDF</a><a className="text-link" href={item.recordUrl}>Zenodo</a><Link className="text-link" to={`/research/${item.slug}`}>Publication details</Link>{item.relatedProject && <Link className="text-link" to={`/projects/${item.relatedProject}`}>Related project</Link>}</div></div></article>)}</div>
    </section>
    <section className="shell section book-catalog">
      <h2>Engineering books</h2>
      <article className="research-entry">
        <div className="research-meta">{book.type}</div>
        <div>
          <h3><Link to={iulinuxPublicationsPath}>{book.title}</Link></h3>
          <p>{book.subtitle}</p>
          <p className="metadata">{book.author} · <time dateTime={book.date}>November 22, 2026</time> · Edition v{book.edition} · {book.pages} pages</p>
          <p className="doi"><a href={`https://doi.org/${book.editionDoi}`}>DOI {book.editionDoi}</a></p>
        </div>
      </article>
    </section>
    <section className="soft section"><div className="shell"><p className="section-label">Models & experiments</p><p>Model releases, datasets, and experimental records.</p><Link className="text-link" to="/models">Explore models & experiments</Link></div></section>
  </>;
}

import { useEffect, useState } from 'react';
import { siteConfig } from '../config';
import { iulinuxBook as book } from '../data/books';
import { iulinuxPublicationsPath, iulinuxRelease as release } from '../data/iulinux';

const cover = '/assets/books/iulinux-v0.3.5-cover.png';

export default function IULinuxPublications() {
  const [copyStatus, setCopyStatus] = useState('');

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(book.citation);
      setCopyStatus('Citation copied.');
    } catch {
      setCopyStatus('Select the citation text to copy it.');
    }
  }

  useEffect(() => {
    const schema = document.createElement('script');
    schema.id = 'iulinux-book-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: book.title,
      alternateName: book.subtitle,
      author: { '@type': 'Person', name: book.author, sameAs: book.orcid },
      datePublished: book.date,
      bookEdition: `v${book.edition}`,
      numberOfPages: book.pages,
      url: siteConfig.origin + iulinuxPublicationsPath,
      image: siteConfig.origin + cover,
      sameAs: `https://doi.org/${book.editionDoi}`,
      license: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    });
    document.head.append(schema);
    return () => schema.remove();
  }, []);

  return (
    <section className="case-section" id="publications" tabIndex={-1} aria-labelledby="publications-heading">
      <h2 id="publications-heading">Publications</h2>
      <article className="publication-book">
        <img src={cover} alt={`Published cover of ${book.title}`} loading="lazy" />
        <div>
          <p className="section-label">{book.type}</p>
          <h3>{book.title}</h3>
          <p className="book-subtitle">{book.subtitle}</p>
          <p className="byline">{book.author} · <a href={book.orcid}>ORCID</a></p>
          <p className="metadata"><time dateTime={book.date}>November 22, 2026</time> · Edition v{book.edition} · {book.pages} pages · {book.chapterCount} chapters · {book.references} references</p>
          <p>{book.description}</p>
          <div className="actions">
            <a className="button primary" href={book.pdf}>Read book PDF</a>
            <a className="button secondary" href={book.repository}>Book repository</a>
          </div>
          <p className="doi">DOI <a href={`https://doi.org/${book.editionDoi}`}>{book.editionDoi}</a></p>
          <details className="publication-details">
            <summary>Scope, contents, and citation</summary>
            <p>{book.scope}</p>
            <ol>{book.chapters.map(chapter => <li key={chapter}>{chapter}</li>)}</ol>
            <p>{book.releaseNotes}</p>
            <dl className="record-list">
              <div><dt>Concept DOI</dt><dd><a href={`https://doi.org/${book.conceptDoi}`}>{book.conceptDoi}</a></dd></div>
              <div><dt>ISBN</dt><dd>None</dd></div>
              <div><dt>License</dt><dd>{book.license}</dd></div>
            </dl>
            <p>{book.citation}</p>
            <button className="button secondary" type="button" onClick={copyCitation}>Copy citation</button>
            <p className="metadata" role="status">{copyStatus}</p>
            <pre className="bibtex"><code>{book.bibtex}</code></pre>
          </details>
        </div>
      </article>
      <article className="publication-handbook">
        <p className="section-label">Operating system documentation</p>
        <h3>{release.name} — Technical and User Handbook</h3>
        <p className="metadata">Public Release edition · <time dateTime={release.date}>{release.published}</time> · 48 pages · 18 chapters · 18 figures · 12 tables · 3 appendices</p>
        <p>Practical guidance on verifying and installing Beta 1, configuring a workstation, managing updates and profiles, and recovering configuration. It also records the boundaries of the Beta 1 qualification.</p>
        <div className="actions">
          <a className="button primary" href={release.website + 'handbook.html'}>Read handbook online</a>
          <a className="button secondary" href={release.website + 'assets/downloads/IULinux-0.2-Beta1-Handbook.pdf'}>Download handbook PDF</a>
        </div>
      </article>
    </section>
  );
}

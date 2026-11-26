import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { siteConfig } from '../config';

type Theme = 'light' | 'dark';

const navigation = [
  ['/projects', 'Projects'], ['/iulinux', 'IULinux'], ['/research', 'Research'],
  ['/models', 'Models'], ['/ios', 'iOS Apps'], ['/about', 'About'], ['/contact', 'Contact'],
];

function savedTheme(): Theme {
  const stored = window.localStorage?.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function Brand() {
  return <Link className="brand" to="/"><span aria-hidden="true">IU</span><b>Irfan Uruçi</b></Link>;
}

export default function Layout({ children }: { children: ReactNode }) {
  const [openAt, setOpenAt] = useState<string | null>(null);
  const [theme, setTheme] = useState(savedTheme);
  const { key } = useLocation();
  const menu = openAt === key;
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage?.setItem('theme', theme);
  }, [theme]);

  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="site-header" onKeyDown={event => {
      if (event.key === 'Escape' && menu) {
        setOpenAt(null);
        menuButton.current?.focus();
      }
    }}>
      <div className="nav-wrap shell">
        <Brand />
        <nav id="site-nav" className={menu ? 'open' : ''} aria-label="Primary">
          {navigation.map(([path, label]) => <NavLink key={path} to={path} onClick={() => setOpenAt(null)}>{label}</NavLink>)}
        </nav>
        <div className="nav-controls">
          <button className="theme" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button className="menu-button" ref={menuButton} aria-expanded={menu} aria-controls="site-nav" onClick={() => {
            setOpenAt(menu ? null : key);
            if (!menu) requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>('#site-nav a')?.focus());
          }}>{menu ? 'Close' : 'Menu'}</button>
        </div>
      </div>
    </header>
    <main id="main" tabIndex={-1}>{children}</main>
    <footer className="site-footer">
      <div className="shell footer-layout">
        <div className="footer-identity"><Brand /><p>Computer Engineer<br />North Macedonia</p></div>
        <nav className="footer-group" aria-label="Engineering links">
          <h2>Engineering</h2><Link to="/projects">Projects</Link><Link to="/iulinux">IULinux</Link><Link to="/ios">iOS Apps</Link>
        </nav>
        <nav className="footer-group" aria-label="Research links">
          <h2>Research</h2><Link to="/research">Publications</Link><Link to="/models">Models</Link>
        </nav>
        <nav className="footer-group" aria-label="Resource links">
          <h2>Resources</h2><a href={siteConfig.github}>GitHub</a><Link to="/about">About</Link><Link to="/contact">Contact</Link>
        </nav>
        <nav className="footer-group" aria-label="App support and privacy links">
          <h2>App support & privacy</h2>
          <Link to="/ios/engtoolbox/support">EngToolBox Support</Link>
          <Link to="/ios/engtoolbox/privacy">EngToolBox Privacy</Link>
          <Link to="/ios/smart-study-planner/privacy-policy">Smart Study Planner Privacy</Link>
        </nav>
        <small>© {new Date().getFullYear()} Irfan Uruçi</small>
      </div>
    </footer>
  </>;
}

import { Link } from 'react-router-dom';
import IULinuxPublications from '../components/IULinuxPublications';
import Seo from '../components/Seo';
import { iulinuxPublicationsPath, iulinuxRelease as release } from '../data/iulinux';

const evidence = [
  ['365/365', 'Python regression tests passed at the Beta transition checkpoint'],
  ['10/10', 'Recorded Beta VM acceptance checks passed'],
  ['6', 'Core IULinux packages'],
  ['221', 'Package-owned files'],
  ['87', 'Excluded overlay mirrors'],
  ['15.10%', 'Installation-image size reduction from original Alpha 1'],
];

const architecture = [
  ['System and desktop', 'Ubuntu 26.04 LTS and the Linux kernel provide the system base. KDE Plasma supplies the desktop. IULinux Settings uses a Qt/QML frontend with Python providers to expose native configuration within that environment.'],
  ['Hardware and telemetry', 'Provider detection probes available backends, and arbitration selects the applicable provider for graphics, display and power controls. Providers run asynchronously and adjust telemetry collection to the visibility of the associated interface.'],
  ['Software and trust', 'The App Store uses AppStream metadata and submits guarded transactions through PackageKit. Previews and Polkit authorization precede package changes, with APT and dpkg handling installation from the signed archive. Optional workstation profiles define package selections.'],
  ['Deployment and recovery', 'Debian package ownership defines which files ship and update with the distribution. Excluding overlay mirrors keeps deployed files consistent with their package versions. Configuration backup and recovery handle supported workstation settings.'],
  ['Image construction and release', 'Build scripts assemble the root filesystem and amd64 ISO, including Calamares installer integration. Release engineering covers VM installation and boot checks, publication, and verification of the public image against its SHA-256 checksum.'],
];

export default function IULinux() {
  return <>
    <Seo title={release.name} description="Architecture, engineering validation, and publications for the IULinux public beta." path="/iulinux" image={release.screenshot} />
    <header className="shell case-intro">
      <p className="eyebrow">Independent engineering project · Operating systems</p>
      <h1>{release.name}</h1>
      <p className="byline">Public Beta · <time dateTime={release.date}>{release.published}</time> · amd64</p>
      <p className="lede">A Linux workstation distribution built on Ubuntu 26.04 LTS and KDE Plasma. It integrates native system configuration, hardware-aware management, guarded package transactions, authenticated software distribution, optional workstation profiles, and configuration recovery.</p>
      <div className="actions">
        <a className="button primary" href={release.website}>Visit the official IULinux website</a>
        <Link className="button secondary" to={iulinuxPublicationsPath}>View publications</Link>
      </div>
    </header>

    <div className="shell">
      <figure className="desktop-shot">
        <a href={release.screenshot}><img src={release.screenshot} alt={release.screenshotAlt} width="2048" height="1276" fetchPriority="high" /></a>
        <figcaption>Beta 1 running on physical ASUS hardware. <a href={release.screenshot}>View full-resolution screenshot</a></figcaption>
      </figure>

      <section className="case-section">
        <h2>Engineering achievements and validation</h2>
        <dl className="evidence-grid">
          {evidence.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <p>Original Alpha 1 image <strong>2,952,669,184 bytes</strong> · Beta 1 image <strong>2,506,704,896 bytes</strong>.</p>
        <p>Independent public download and SHA-256 verification completed.</p>
      </section>

      <section className="case-section">
        <h2>System architecture</h2>
        <dl className="architecture-rows">
          {architecture.map(([label, description]) => <div key={label}><dt>{label}</dt><dd>{description}</dd></div>)}
        </dl>
        <p className="note"><strong>Qualification scope.</strong> The recorded VM checks apply to the tested configuration. Graphics switching, advanced power controls, and Secure Boot behavior depend on hardware, drivers, and firmware. Qualify those capabilities on the target system.</p>
      </section>

      <IULinuxPublications />

      <section className="case-section">
        <h2>Official project resources</h2>
        <p>Installation instructions, release downloads, screenshots, and user documentation are maintained on the official IULinux website.</p>
        <div className="actions">
          <a className="button primary" href={release.website}>Official IULinux website</a>
          <a className="button secondary" href={release.iso}>Download Beta 1 ISO</a>
        </div>
        <div className="research-links">
          <a className="text-link" href={release.website + '#download'}>Official download page</a>
          <a className="text-link" href={release.iso + '.sha256'}>SHA-256 checksum file</a>
          <a className="text-link" href={release.archive}>Signed APT archive</a>
          <a className="text-link" href={release.source}>Operating-system source</a>
          <a className="text-link" href="https://github.com/IrfanUruchi/iulinux-website">Website source</a>
        </div>
        <p className="checksum"><span>Official SHA-256</span><code>{release.sha256}</code></p>
      </section>
    </div>
  </>;
}

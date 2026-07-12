import Seo from'../components/Seo';import{siteConfig}from'../config';
const links=[['GitHub',siteConfig.github],['Hugging Face',siteConfig.huggingFace],['Docker Hub',siteConfig.dockerHub]];
export default function Contact(){return <><Seo title="Contact" description="Contact links for Irfan Uruçi." path="/contact"/><header className="page-head shell"><p className="eyebrow">Contact</p><h1>Contact.</h1></header><section className="contact-list shell section">{links.map(([name,url],i)=><a href={url} key={name}><span>{String(i+1).padStart(2,'0')}</span><h2>{name}</h2><b>↗</b></a>)}</section></>}

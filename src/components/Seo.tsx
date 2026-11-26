import { useEffect } from 'react';
import { siteConfig } from '../config';

type SeoProps = { title: string; description: string; path?: string; image?: string };

export default function Seo({ title, description, path = '', image }: SeoProps) {
  useEffect(() => {
    document.title = `${title} — ${siteConfig.name}`;
    const set = (key: string, value: string, attribute = 'name') => {
      let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.append(meta);
      }
      meta.content = value;
      return meta;
    };

    const canonical = siteConfig.origin + path;
    set('description', description);
    set('og:title', title, 'property');
    set('og:description', description, 'property');
    set('og:type', 'website', 'property');
    set('og:url', canonical, 'property');
    set('twitter:card', image ? 'summary_large_image' : 'summary');
    set('twitter:title', title);
    set('twitter:description', description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.append(link);
    }
    link.href = canonical;

    if (image) {
      const preview = set('og:image', siteConfig.origin + image, 'property');
      return () => preview.remove();
    }
  }, [title, description, path, image]);
  return null;
}

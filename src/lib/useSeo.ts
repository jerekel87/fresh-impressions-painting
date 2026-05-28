import { useEffect, useState } from 'react';
import { supabase } from './supabase';

interface SeoData {
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
  robots: string;
  structured_data: object;
  custom_head: string;
}

const seoCache: Record<string, SeoData> = {};

export function useSeo(page: string) {
  const [seo, setSeo] = useState<SeoData | null>(seoCache[page] || null);

  useEffect(() => {
    if (seoCache[page]) {
      applySeo(seoCache[page], page);
      return;
    }

    const fetchSeo = async () => {
      const { data } = await supabase
        .from('seo_settings')
        .select('*')
        .in('page', ['global', page]);

      if (data && data.length > 0) {
        const global = data.find(d => d.page === 'global');
        const specific = data.find(d => d.page === page);
        const merged: SeoData = {
          title: specific?.title || global?.title || '',
          description: specific?.description || global?.description || '',
          keywords: specific?.keywords || global?.keywords || '',
          og_title: specific?.og_title || specific?.title || global?.og_title || '',
          og_description: specific?.og_description || specific?.description || global?.og_description || '',
          og_image: specific?.og_image || global?.og_image || '',
          canonical_url: specific?.canonical_url || '',
          robots: specific?.robots || global?.robots || 'index, follow',
          structured_data: specific?.structured_data || global?.structured_data || {},
          custom_head: specific?.custom_head || '',
        };
        seoCache[page] = merged;
        setSeo(merged);
        applySeo(merged, page);
      }
    };

    fetchSeo();
  }, [page]);

  return seo;
}

function applySeo(seo: SeoData, _page: string) {
  if (seo.title) {
    document.title = seo.title;
  }

  setMeta('description', seo.description);
  setMeta('keywords', seo.keywords);
  setMeta('robots', seo.robots);

  setMeta('og:title', seo.og_title || seo.title, 'property');
  setMeta('og:description', seo.og_description || seo.description, 'property');
  setMeta('og:type', 'website', 'property');
  if (seo.og_image) setMeta('og:image', seo.og_image, 'property');
  if (seo.canonical_url) setMeta('og:url', seo.canonical_url, 'property');

  setMeta('twitter:card', 'summary_large_image', 'name');
  setMeta('twitter:title', seo.og_title || seo.title, 'name');
  setMeta('twitter:description', seo.og_description || seo.description, 'name');
  if (seo.og_image) setMeta('twitter:image', seo.og_image, 'name');

  // Canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (seo.canonical_url) {
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', seo.canonical_url);
  } else if (canonicalEl) {
    canonicalEl.remove();
  }

  // Structured data
  let scriptEl = document.querySelector('script[data-seo-jsonld]') as HTMLScriptElement | null;
  if (seo.structured_data && Object.keys(seo.structured_data).length > 0) {
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.setAttribute('type', 'application/ld+json');
      scriptEl.setAttribute('data-seo-jsonld', 'true');
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(seo.structured_data);
  } else if (scriptEl) {
    scriptEl.remove();
  }
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

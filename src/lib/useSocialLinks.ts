import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export interface SocialLinks {
  facebook: string;
  instagram: string;
  nextdoor: string;
  google: string;
  yelp: string;
  tiktok: string;
}

const defaults: SocialLinks = {
  facebook: 'https://www.facebook.com/freshimpressionspainting',
  instagram: 'https://www.instagram.com/freshimpressionspainting',
  nextdoor: 'https://nextdoor.com',
  google: '',
  yelp: '',
  tiktok: '',
};

let cached: SocialLinks | null = null;
let fetchPromise: Promise<SocialLinks> | null = null;

function fetchSocialLinks(): Promise<SocialLinks> {
  if (!fetchPromise) {
    fetchPromise = supabase
      .from('site_content')
      .select('content')
      .eq('page', 'global')
      .eq('section', 'social_links')
      .maybeSingle()
      .then(({ data }) => {
        const result = data?.content ? (data.content as SocialLinks) : defaults;
        cached = result;
        return result;
      });
  }
  return fetchPromise;
}

export function useSocialLinks(): SocialLinks {
  const [links, setLinks] = useState<SocialLinks>(cached || defaults);

  useEffect(() => {
    if (cached) {
      setLinks(cached);
    } else {
      fetchSocialLinks().then(setLinks);
    }
  }, []);

  return links;
}

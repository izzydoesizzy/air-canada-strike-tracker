export interface AdVariant {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  url: string;
  price: string;
  originalPrice?: string;
}

export const AD_VARIANTS: AdVariant[] = [
  {
    id: 'resume-course',
    title: 'Get 2x more interviews in 20 minutes',
    subtitle: '4 ChatGPT prompts that actually work',
    ctaText: 'Get Course ($7)',
    url: 'https://stan.store/joinclearcareer/p/the-20minute-resume-levelup',
    price: '$7',
    originalPrice: '$99'
  },
  {
    id: 'job-search-prompts',
    title: 'Get unstuck. Get noticed. Get hired.',
    subtitle: 'ChatGPT prompts used by hundreds of job seekers',
    ctaText: 'Get Prompts ($14)',
    url: 'https://stan.store/joinclearcareer/p/chatgpt-job-search-power-prompts',
    price: '$14',
    originalPrice: '$49'
  },
  {
    id: 'email-templates',
    title: 'Write better emails. Get more replies.',
    subtitle: '7+ proven email templates for job seekers',
    ctaText: 'Get Templates ($7)',
    url: 'https://stan.store/joinclearcareer/p/email-power-templates-for-job-seekers',
    price: '$7',
    originalPrice: '$14'
  }
];

export const getAdVariant = (): AdVariant => {
  // Check if user already has an assigned variant in session
  const sessionVariant = sessionStorage.getItem('ad-variant-id');
  
  if (sessionVariant) {
    const variant = AD_VARIANTS.find(v => v.id === sessionVariant);
    if (variant) return variant;
  }
  
  // Assign new random variant (33.3% split)
  const randomIndex = Math.floor(Math.random() * AD_VARIANTS.length);
  const selectedVariant = AD_VARIANTS[randomIndex];
  
  // Store in session for consistency
  sessionStorage.setItem('ad-variant-id', selectedVariant.id);
  
  return selectedVariant;
};
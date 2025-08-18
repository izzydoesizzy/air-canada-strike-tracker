export interface AdVariant {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  url: string;
  price: string;
  originalPrice?: string;
  icon?: string;
  socialProof?: string;
  ctaVariants?: string[];
}

export const AD_VARIANTS: AdVariant[] = [
  {
    id: 'resume-course',
    title: 'Get 2x more interviews in 20 minutes',
    subtitle: '4 ChatGPT prompts that actually work',
    ctaText: 'Get Course – $7',
    url: 'https://stan.store/joinclearcareer/p/the-20minute-resume-levelup',
    price: '$7',
    originalPrice: '$99',
    icon: '📄',
    socialProof: 'Trusted by 500+ job seekers',
    ctaVariants: ['Get Course – $7', 'Start Now ($7)', 'Level Up ($7)']
  },
  {
    id: 'job-search-prompts',
    title: 'Get unstuck. Get noticed. Get hired.',
    subtitle: 'ChatGPT prompts used by hundreds of job seekers',
    ctaText: 'Get Prompts – $14',
    url: 'https://stan.store/joinclearcareer/p/chatgpt-job-search-power-prompts',
    price: '$14',
    originalPrice: '$49',
    icon: '🎯',
    socialProof: 'Used by 800+ job seekers',
    ctaVariants: ['Get Prompts – $14', 'Get Unstuck ($14)', 'Start Today ($14)']
  },
  {
    id: 'email-templates',
    title: 'Write better emails. Get more replies.',
    subtitle: '7+ proven email templates for job seekers',
    ctaText: 'Get Templates – $7',
    url: 'https://stan.store/joinclearcareer/p/email-power-templates-for-job-seekers',
    price: '$7',
    originalPrice: '$14',
    icon: '✉️',
    socialProof: 'Trusted by 1,200+ job seekers',
    ctaVariants: ['Get Templates – $7', 'Unlock Templates ($7)', 'Boost Replies – $7']
  }
];

export const getAdVariant = (): AdVariant => {
  // Check if user already has an assigned variant in session
  const sessionVariant = sessionStorage.getItem('ad-variant-id');
  const ctaVariantIndex = sessionStorage.getItem('cta-variant-index');
  
  if (sessionVariant) {
    const variant = AD_VARIANTS.find(v => v.id === sessionVariant);
    if (variant) {
      // Apply CTA variant if available
      if (ctaVariantIndex && variant.ctaVariants) {
        const index = parseInt(ctaVariantIndex, 10);
        if (index < variant.ctaVariants.length) {
          variant.ctaText = variant.ctaVariants[index];
        }
      }
      return variant;
    }
  }
  
  // Assign new random variant (33.3% split)
  const randomIndex = Math.floor(Math.random() * AD_VARIANTS.length);
  const selectedVariant = AD_VARIANTS[randomIndex];
  
  // Assign random CTA variant for A/B testing
  if (selectedVariant.ctaVariants) {
    const ctaIndex = Math.floor(Math.random() * selectedVariant.ctaVariants.length);
    selectedVariant.ctaText = selectedVariant.ctaVariants[ctaIndex];
    sessionStorage.setItem('cta-variant-index', ctaIndex.toString());
  }
  
  // Store in session for consistency
  sessionStorage.setItem('ad-variant-id', selectedVariant.id);
  
  return selectedVariant;
};
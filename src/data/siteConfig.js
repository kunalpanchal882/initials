/**
 * Reverts Agency Site Configuration
 * All contact information and feature flags are managed here.
 */
export const siteConfig = {
  brand: {
    name: 'Reverts',
    tagline: 'Ideas into stories. Stories into cinema.',
    description: 'We turn ideas, stories, and products into cinematic AI-generated videos for brands, creators, startups, and visionary businesses.',
    established: '2025',
  },

  // Contact details - replace placeholders before live client handoff
  contact: {
    // REPLACE: Primary agency inbox
    email: 'hello@reverts.com',
    
    // REPLACE: Primary agency phone (Indian format +91 00000 00000)
    phone: '+91 00000 00000',
    phoneRaw: '910000000000', // Digits only for wa.me and tel

    // WhatsApp prefilled message
    whatsappMessage: "Hi Reverts, I'd like to discuss a video project.",

    // Location & Availability
    location: 'Bhopal, India',
    availabilityNote: 'Working worldwide • Open for selected projects',
    responseTime: 'We usually reply within 24 hours.',
    timezone: 'IST (UTC+5:30)',

    // Social Links (only platforms with a valid URL string are rendered)
    socials: {
      instagram: 'https://instagram.com/reverts.studio', // REPLACE or set null
      linkedin: 'https://linkedin.com/company/reverts-studio', // REPLACE or set null
      youtube: 'https://youtube.com/@reverts-studio', // REPLACE or set null
      x: 'https://x.com/reverts_studio', // REPLACE or set null
    },
  },

  // Honesty Rule: Keep testimonials and fake metrics hidden until authentic records exist
  flags: {
    showTestimonials: false,
    showMetrics: false,
    showAwards: false,
  },
}

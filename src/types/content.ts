// Types for next-intl `t.raw()` content blocks. These mirror the shape of the
// namespaces authored in messages/en.json (the source of truth). Cast at the
// read site: `const hero = t.raw('') as HeroContent`.

export type Cta = { label: string; href: string; variant?: 'primary' | 'secondary' }

export type CommonContent = {
  availability: { label: string; statusLine: string; hudLabel: string }
  mobileCta: { title: string; button: string }
  homeHudLabel: string
}

export type NavContent = {
  links: { label: string; href: string }[]
  cta: { label: string; href: string }
}

export type HeroContent = {
  eyebrow: string
  headlineLines: string[]
  headlineHighlight: string
  subhead: string
  statusRow: { left: string; center: string; right: string }
  ctas: Cta[]
}

export type TickerContent = { items: string[] }

export type StatItem = {
  value: number | null
  decimals?: number
  prefix?: string
  suffix?: string
  display?: string
  label: string
  accent: 'foreground' | 'highlight' | 'primary'
}

export type ProblemContent = {
  eyebrow: string
  kicker: string
  heading: string
  body: string
}

export type ServiceItem = {
  number: string
  title: string
  description: string
  tags: string[]
}

export type ServicesContent = {
  section: { eyebrow: string; kicker: string; heading: string; intro: string }
  items: ServiceItem[]
}

export type WorkChrome = {
  eyebrow: string
  kicker: string
  heading: string
  feedLabel: string
  hint: string
}

export type ProcessPhase = { number: string; title: string; description: string }

export type ProcessContent = {
  section: { eyebrow: string; kicker: string; heading: string }
  phases: ProcessPhase[]
}

export type PricingTier = {
  name: string
  price: string
  priceUnit: string
  description: string
  features: string[]
  featured: boolean
  badge?: string
}

export type EngagementContent = {
  pricing: {
    section: { eyebrow: string; kicker: string; heading: string }
    tiers: PricingTier[]
  }
  faq: {
    section: { heading: string }
    items: { question: string; answer: string }[]
  }
}

export type ContactContent = {
  eyebrow: string
  kicker: string
  heading: string
  subhead: string
  points: string[]
  form: {
    projectTypes: string[]
    budgetTiers: string[]
    timelines: string[]
    submitLabel: string
  }
  bookCall: string
  orDivider: string
  fields: {
    name: string
    email: string
    projectType: string
    budget: string
    timeline: string
    message: string
  }
  placeholders: { name: string; email: string; message: string }
}

export type FooterContent = {
  blurb: string
  cta: { label: string; href: string }
  copyright: string
  endLabel: string
  wordmark: string
}

export type TestimonialQuote = {
  text: string
  name: string
  role: string
  source?: string
  project?: string
  avatar?: string | null
  verified?: boolean
}

export type TestimonialBrand = { name: string; verified?: boolean }

export type TestimonialsContent = {
  section: { eyebrow: string; kicker: string; trustedByLabel: string }
  quotes: TestimonialQuote[]
  trustedBy: TestimonialBrand[]
}

export type SkillBar = { label: string; fill: number; max: number }

export type AboutHomeDossier = {
  eyebrow: string
  kicker: string
  name: string
  class: string
  blurb: string
  skillBars: SkillBar[]
  ossChip: { label: string; name: string; metric: string }
  bioLink: { label: string; href: string }
}

export type AboutStat = {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
}

export type AboutPageContent = {
  eyebrow: string
  kicker: string
  hudLabel: string
  intro: { headline: string; headlineHighlight: string; subhead: string }
  stats: AboutStat[]
  dossier: { eyebrow: string; kicker: string; paragraphs: string[] }
  doctrine: {
    eyebrow: string
    kicker: string
    values: { title: string; description: string }[]
  }
  inTheOpen: {
    eyebrow: string
    kicker: string
    name: string
    metric: string
    description: string
    link: { label: string; href: string }
  }
  cta: { heading: string; subhead: string; button: { label: string; href: string } }
}

export type AboutContent = {
  homepageDossier: AboutHomeDossier
  page: AboutPageContent
}

export type CaseStudyCopy = {
  name: string
  category: string
  tagline: string
  row: { blurb: string }
  context: string
  problem: { head: string; body: string; before: string }
  approach: { intro: string; cards: { heading: string; body: string }[] }
  result: { head: string; before: string[]; after: string[] }
  quote: { text: string; role: string }
  metricLabels: string[]
}

export type CaseStudyPageContent = {
  private: string
  ctaHeading: string
  ctaButton: string
  nextLabel: string
  before: string
  after: string
  linkLabels: { github: string; npm: string; live: string }
}

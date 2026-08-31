export interface HeroStat {
  icon: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface HeroBadge {
  icon: string;
  label: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface Step {
  title: string;
  description: string;
}

export type RoleTone = "blue" | "green" | "amber";

export interface Worker {
  name: string;
  role: string;
  roleTone: RoleTone;
  rating: number;
  experience: string;
  location: string;
}

export interface MapPin {
  label: string;
  top: string;
  left: string;
}

export interface TrustPoint {
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imagePublicId: string | null;
}

export interface ChoosePathOption {
  icon: string;
  title: string;
  description: string;
  buttonLabel: string;
}

export interface HowItWorksVideo {
  title: string;
  description: string;
  youtubeUrl: string;
}

export interface HirerReview {
  name: string;
  role: string;
  rating: number;
  review: string;
  avatarPublicId: string | null;
}

export interface ContactBranch {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  url: string;
}

export interface SiteContent {
  siteSettings: {
    logoPublicId: string | null;
    siteName: string;
    tagline: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    faviconPublicId: string | null;
    ogImagePublicId: string | null;
  };
  hero: {
    imagePublicId: string | null;
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    howItWorksVideoUrl: string;
    ratingValue: string;
    ratingLabel: string;
    searchHeading: string;
    searchPlaceholder: string;
    searchButton: string;
    stats: HeroStat[];
    badges: HeroBadge[];
    galleryImagePublicIds: (string | null)[];
    popularSearches: string[];
  };
  services: {
    heading: string;
    subheading: string;
    items: ServiceItem[];
  };
  requestSection: {
    headingLine1: string;
    headingHighlight: string;
    formHeading: string;
    submitLabel: string;
    steps: Step[];
  };
  findLabour: {
    heading: string;
    subheading: string;
    workers: Worker[];
    mapPins: MapPin[];
  };
  trustPoints: TrustPoint[];
  reviews: {
    heading: string;
    subheading: string;
    items: HirerReview[];
  };
  choosePath: {
    heading: string;
    subheading: string;
    hireLabour: ChoosePathOption;
    becomeLabour: ChoosePathOption;
  };
  missionVision: {
    heading: string;
    subheading: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
    values: TrustPoint[];
  };
  contact: {
    helpTitle: string;
    helpText: string;
    phoneLabel: string;
    phone: string;
    phoneNote: string;
    whatsappLabel: string;
    socialLinks: SocialLink[];
  };
  aboutPage: {
    heading: string;
    subheading: string;
    imagePublicId: string | null;
    storyHeading: string;
    storyParagraphs: string[];
    missionHeading: string;
    missionText: string;
    stats: HeroStat[];
    team: TeamMember[];
  };
  contactPage: {
    heading: string;
    subheading: string;
    formHeading: string;
    branches: ContactBranch[];
  };
  servicesPage: {
    heading: string;
    subheading: string;
    intro: string;
  };
  findLabourPage: {
    heading: string;
    subheading: string;
  };
  blogPage: {
    heading: string;
    subheading: string;
  };
  becomeLabourPage: {
    heading: string;
    subheading: string;
    formHeading: string;
    submitLabel: string;
    successMessage: string;
  };
  howItWorksPage: {
    heading: string;
    subheading: string;
    videos: HowItWorksVideo[];
  };
  labourRequestPage: {
    heading: string;
    subheading: string;
  };
}

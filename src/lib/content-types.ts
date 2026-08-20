export interface HeroStat {
  icon: string;
  value: string;
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

export interface SiteContent {
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
  contact: {
    helpTitle: string;
    helpText: string;
    phoneLabel: string;
    phone: string;
    phoneNote: string;
    whatsappLabel: string;
  };
  aboutPage: {
    heading: string;
    subheading: string;
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
    email: string;
    phone: string;
    address: string;
    hours: string;
    formHeading: string;
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
}

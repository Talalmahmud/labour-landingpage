import type { SiteContent } from "@/lib/content-types";

export const defaultContent: SiteContent = {
  siteSettings: {
    logoPublicId: null,
    siteName: "Shromik",
    tagline: "Service for People",
  },
  seo: {
    metaTitle: "Shromik — Find Trusted Labour for Any Work, Anytime",
    metaDescription:
      "Connect with skilled and reliable labour for all kinds of work at your convenience.",
    keywords: "labour, workers, hire labour, skilled workers, manpower",
    faviconPublicId: null,
    ogImagePublicId: null,
  },
  hero: {
    imagePublicId: null,
    titleLine1: "Find Trusted",
    titleLine2: "Labour for Any",
    titleHighlight: "Work, Anytime",
    subtitle:
      "We connect you with skilled and reliable labour for all kinds of work at your convenience.",
    ctaPrimary: "Request Labour Now",
    ctaSecondary: "How It Works",
    howItWorksVideoUrl: "https://youtu.be/LzxAetI7Mx4",
    ratingValue: "4.8/5",
    ratingLabel: "Trusted by 10,000+ Users",
    searchHeading: "Find Labour Near You",
    searchPlaceholder: "Enter your location",
    searchButton: "Find Labour",
    stats: [
      {
        icon: "shield-check",
        value: "10,000+",
        label: "Verified Workers",
        sublabel: "Skilled & background verified",
      },
      {
        icon: "users",
        value: "50,000+",
        label: "Jobs Completed",
        sublabel: "Successfully delivered",
      },
      {
        icon: "tag",
        value: "4.8/5",
        label: "Customer Rating",
        sublabel: "Based on real reviews",
      },
      {
        icon: "headphones",
        value: "24/7",
        label: "Support Available",
        sublabel: "We're here to help",
      },
    ],
    badges: [
      { icon: "shield-check", label: "Verified Workers" },
      { icon: "zap", label: "Instant Matching" },
      { icon: "lock", label: "Secure & Reliable" },
    ],
    galleryImagePublicIds: [null, null, null, null, null],
    popularSearches: ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi"],
  },
  services: {
    heading: "Popular Labour Services",
    subheading: "Choose from a wide range of skilled labour for your needs",
    items: [
      {
        icon: "zap",
        imagePublicId: null,
        title: "Electrician",
        description: "Installation, wiring & repair work",
      },
      {
        icon: "droplet",
        imagePublicId: null,
        title: "Plumber",
        description: "Pipe fitting, leak fixing & more",
      },
      {
        icon: "hammer",
        imagePublicId: null,
        title: "Carpenter",
        description: "Furniture, doors, windows & more",
      },
      {
        icon: "paint-roller",
        imagePublicId: null,
        title: "Painter",
        description: "Wall painting, polish, texture & more",
      },
      {
        icon: "blocks",
        imagePublicId: null,
        title: "Mason",
        description: "Brick work, plastering, construction",
      },
      {
        icon: "user",
        imagePublicId: null,
        title: "Helper",
        description: "General helper for daily tasks",
      },
      {
        icon: "snowflake",
        imagePublicId: null,
        title: "AC Technician",
        description: "AC installation, service & repair",
      },
      {
        icon: "flame",
        imagePublicId: null,
        title: "Welder",
        description: "Welding, fabrication & metal work",
      },
      {
        icon: "car",
        imagePublicId: null,
        title: "Driver",
        description: "Driver for car, pickup & more",
      },
      {
        icon: "layout-grid",
        imagePublicId: null,
        title: "More Services",
        description: "Explore many other services",
      },
    ],
  },
  requestSection: {
    headingLine1: "Request Labour",
    headingHighlight: "3 Simple Steps",
    formHeading: "Fill the form to request a labour",
    submitLabel: "Submit Request",
    steps: [
      { title: "Fill the Request Form", description: "Tell us what kind of labour you need" },
      { title: "Get Matched", description: "We'll connect you with the right labour" },
      { title: "Work Getting Done", description: "The job gets done with satisfaction" },
    ],
  },
  findLabour: {
    heading: "Find Labour Near You",
    subheading: "Browse available workers in your area and hire the best match.",
    workers: [
      {
        name: "Abdul Karim",
        role: "Electrician",
        roleTone: "blue",
        rating: 4.7,
        experience: "6 years experience",
        location: "Mirpur, Dhaka",
      },
      {
        name: "Sujon Das",
        role: "Plumber",
        roleTone: "green",
        rating: 4.8,
        experience: "5 years experience",
        location: "Mohammadpur, Dhaka",
      },
      {
        name: "Ratan Mia",
        role: "Mason",
        roleTone: "amber",
        rating: 4.8,
        experience: "8 years experience",
        location: "Uttara, Dhaka",
      },
    ],
    mapPins: [
      { label: "Uttara", top: "14%", left: "63%" },
      { label: "Mirpur", top: "22%", left: "18%" },
      { label: "Mohammadpur", top: "70%", left: "10%" },
      { label: "Gulshan", top: "62%", left: "78%" },
      { label: "Badda", top: "45%", left: "88%" },
    ],
  },
  trustPoints: [
    {
      icon: "shield-check",
      title: "Trusted & Verified",
      description: "All labourers are verified and background checked",
    },
    { icon: "tag", title: "Affordable Pricing", description: "Get quality service at the best price" },
    { icon: "zap", title: "Quick Response", description: "Fast matching and on-time service" },
    {
      icon: "thumbs-up",
      title: "100% Satisfaction",
      description: "We ensure your complete satisfaction",
    },
  ],
  reviews: {
    heading: "What Hirers Are Saying",
    subheading: "Real feedback from people who've hired skilled labour through Shromik.",
    items: [
      {
        name: "Rahim Uddin",
        role: "Homeowner, Dhaka",
        rating: 5,
        review:
          "Found a great electrician within an hour of posting my request. Professional, on time, and fairly priced. Highly recommend Shromik.",
        avatarPublicId: null,
      },
      {
        name: "Nasrin Akter",
        role: "Business Owner, Chattogram",
        rating: 5,
        review:
          "We needed a whole team of painters for our office renovation. Shromik matched us fast and every worker showed up verified and ready to work.",
        avatarPublicId: null,
      },
      {
        name: "Kamal Hossain",
        role: "Property Manager, Sylhet",
        rating: 4,
        review:
          "Easy to use platform and the workers are genuinely skilled. Communication could be a bit faster, but overall a great experience.",
        avatarPublicId: null,
      },
    ],
  },
  choosePath: {
    heading: "Choose Your Path",
    subheading: "Whether you need skilled help or you are skilled help, we've got you covered.",
    hireLabour: {
      icon: "search",
      title: "Hire Labour",
      description: "Browse verified workers and get skilled help for your next job, fast.",
      buttonLabel: "Hire Labour",
    },
    becomeLabour: {
      icon: "hard-hat",
      title: "Become a Labour",
      description: "Join our platform, get matched with jobs, and grow your income.",
      buttonLabel: "Become a Labour",
    },
  },
  missionVision: {
    heading: "Our Mission & Vision",
    subheading: "What drives us and where we're headed.",
    missionTitle: "Our Mission",
    missionText:
      "To make skilled labour accessible, trustworthy, and fairly paid — for both the people who hire and the people who do the work.",
    visionTitle: "Our Vision",
    visionText:
      "A world where finding reliable, verified labour is as easy as a few taps, and every skilled worker has a fair path to steady, well-paid work.",
    values: [
      {
        icon: "shield-check",
        title: "Trust First",
        description: "Every worker is verified and background-checked before they join.",
      },
      {
        icon: "handshake",
        title: "Fairness",
        description: "Transparent pricing and fair pay, for customers and workers alike.",
      },
      {
        icon: "zap",
        title: "Reliability",
        description: "Fast matching and dependable service you can count on, every time.",
      },
    ],
  },
  contact: {
    helpTitle: "Need Help?",
    helpText: "We are here to help you 24/7",
    phoneLabel: "Call Us Now",
    phone: "01886 123 456",
    phoneNote: "Available 24/7 for your support",
    whatsappLabel: "WhatsApp Us",
    socialLinks: [],
  },
  aboutPage: {
    heading: "About Shromik",
    subheading: "Connecting skilled labour with the people who need it, since day one.",
    imagePublicId: null,
    storyHeading: "Our Story",
    storyParagraphs: [
      "Shromik started with a simple idea: finding reliable, skilled labour shouldn't be a gamble. Too many people were stuck asking neighbours for recommendations or hiring strangers off the street with no way to check their track record.",
      "Today we connect thousands of verified electricians, plumbers, carpenters, masons, and other skilled workers with people who need work done right, on time, and at a fair price.",
    ],
    missionHeading: "Our Mission",
    missionText:
      "To make skilled labour accessible, trustworthy, and fairly paid — for both the people who hire and the people who do the work.",
    stats: [
      {
        icon: "shield-check",
        value: "10,000+",
        label: "Verified Workers",
        sublabel: "Skilled & background verified",
      },
      {
        icon: "briefcase",
        value: "50,000+",
        label: "Jobs Completed",
        sublabel: "Successfully delivered",
      },
      {
        icon: "map-pin",
        value: "12+",
        label: "Cities Covered",
        sublabel: "Across the country",
      },
      {
        icon: "thumbs-up",
        value: "4.8/5",
        label: "Average Rating",
        sublabel: "Based on real reviews",
      },
    ],
    team: [
      { name: "Imran Hossain", role: "Founder & CEO", bio: "Building trusted labour marketplaces for 8 years.", imagePublicId: null },
      { name: "Nusrat Jahan", role: "Head of Operations", bio: "Keeps every job on schedule and every worker verified.", imagePublicId: null },
      { name: "Farhan Kabir", role: "Head of Partnerships", bio: "Connects Shromik with businesses across Bangladesh.", imagePublicId: null },
    ],
  },
  contactPage: {
    heading: "Get in Touch",
    subheading: "Questions, feedback, or need help with a request? We're here for you.",
    formHeading: "Send us a message",
    branches: [
      {
        name: "Head Office",
        address: "House 12, Road 5, Uttara, Dhaka 1230, Bangladesh",
        phone: "01886 123 456",
        email: "support@shromik.com",
        hours: "Available 24/7",
      },
    ],
  },
  servicesPage: {
    heading: "All Services",
    subheading: "Skilled, verified labour for every kind of job — browse the full list below.",
    intro:
      "Every worker on Shromik is background-checked and rated by real customers. Pick a service to see what's included, or submit a custom request if you don't see what you need.",
  },
  findLabourPage: {
    heading: "Browse All Workers",
    subheading: "Search and filter verified workers by service and location.",
  },
  blogPage: {
    heading: "The Shromik Blog",
    subheading: "Tips, stories, and updates from the world of skilled labour.",
  },
  becomeLabourPage: {
    heading: "Become a Labour",
    subheading: "Join Shromik as a verified worker and start getting matched with jobs near you.",
    formHeading: "Apply to join",
    submitLabel: "Submit Application",
    successMessage: "Application received — our team will contact you soon.",
  },
  howItWorksPage: {
    heading: "How It Works",
    subheading: "Watch how easy it is to find, hire, and work with trusted labour on Shromik.",
    videos: [
      {
        title: "How Shromik Works",
        description: "A quick overview of requesting and hiring skilled labour on Shromik.",
        youtubeUrl: "https://youtu.be/LzxAetI7Mx4",
      },
    ],
  },
  labourRequestPage: {
    heading: "Request Skilled Labour",
    subheading:
      "Tell us what you need and we'll match you with a verified worker, fast.",
  },
};

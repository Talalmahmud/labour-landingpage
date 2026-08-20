import type { SiteContent } from "@/lib/content-types";

export const defaultContent: SiteContent = {
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
      { icon: "shield-check", value: "10,000+", label: "Verified Workers" },
      { icon: "users", value: "50,000+", label: "Jobs Completed" },
      { icon: "tag", value: "4.8/5", label: "Customer Rating" },
    ],
    popularSearches: ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi"],
  },
  services: {
    heading: "Popular Labour Services",
    subheading: "Choose from a wide range of skilled labour for your needs",
    items: [
      { icon: "zap", title: "Electrician", description: "Installation, wiring & repair work" },
      { icon: "droplet", title: "Plumber", description: "Pipe fitting, leak fixing & more" },
      { icon: "hammer", title: "Carpenter", description: "Furniture, doors, windows & more" },
      {
        icon: "paint-roller",
        title: "Painter",
        description: "Wall painting, polish, texture & more",
      },
      { icon: "blocks", title: "Mason", description: "Brick work, plastering, construction" },
      { icon: "user", title: "Helper", description: "General helper for daily tasks" },
      {
        icon: "snowflake",
        title: "AC Technician",
        description: "AC installation, service & repair",
      },
      { icon: "flame", title: "Welder", description: "Welding, fabrication & metal work" },
      { icon: "car", title: "Driver", description: "Driver for car, pickup & more" },
      {
        icon: "layout-grid",
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
  contact: {
    helpTitle: "Need Help?",
    helpText: "We are here to help you 24/7",
    phoneLabel: "Call Us Now",
    phone: "01886 123 456",
    phoneNote: "Available 24/7 for your support",
    whatsappLabel: "WhatsApp Us",
  },
  aboutPage: {
    heading: "About Shromik",
    subheading: "Connecting skilled labour with the people who need it, since day one.",
    storyHeading: "Our Story",
    storyParagraphs: [
      "Shromik started with a simple idea: finding reliable, skilled labour shouldn't be a gamble. Too many people were stuck asking neighbours for recommendations or hiring strangers off the street with no way to check their track record.",
      "Today we connect thousands of verified electricians, plumbers, carpenters, masons, and other skilled workers with people who need work done right, on time, and at a fair price.",
    ],
    missionHeading: "Our Mission",
    missionText:
      "To make skilled labour accessible, trustworthy, and fairly paid — for both the people who hire and the people who do the work.",
    stats: [
      { icon: "shield-check", value: "10,000+", label: "Verified Workers" },
      { icon: "briefcase", value: "50,000+", label: "Jobs Completed" },
      { icon: "map-pin", value: "12+", label: "Cities Covered" },
      { icon: "thumbs-up", value: "4.8/5", label: "Average Rating" },
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
    email: "support@shromik.com",
    phone: "01886 123 456",
    address: "House 12, Road 5, Uttara, Dhaka 1230, Bangladesh",
    hours: "Available 24/7",
    formHeading: "Send us a message",
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
};

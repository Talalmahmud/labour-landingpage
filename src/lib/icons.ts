import {
  Blocks,
  Briefcase,
  Car,
  Droplet,
  Flame,
  Hammer,
  Home,
  Leaf,
  MapPin,
  PaintRoller,
  Package,
  Settings,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Tag,
  ThumbsUp,
  Truck,
  User,
  Users,
  Wrench,
  Zap,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

export const iconRegistry: Record<string, LucideIcon> = {
  zap: Zap,
  droplet: Droplet,
  hammer: Hammer,
  "paint-roller": PaintRoller,
  blocks: Blocks,
  user: User,
  users: Users,
  snowflake: Snowflake,
  flame: Flame,
  car: Car,
  "layout-grid": LayoutGrid,
  wrench: Wrench,
  truck: Truck,
  sparkles: Sparkles,
  leaf: Leaf,
  package: Package,
  "shield-check": ShieldCheck,
  settings: Settings,
  home: Home,
  "map-pin": MapPin,
  tag: Tag,
  "thumbs-up": ThumbsUp,
  briefcase: Briefcase,
};

export const iconKeys = Object.keys(iconRegistry);

export function getIcon(key: string): LucideIcon {
  return iconRegistry[key] ?? LayoutGrid;
}

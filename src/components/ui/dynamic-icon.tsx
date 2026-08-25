"use client";

import { LayoutGrid, type LucideProps } from "lucide-react";
import { DynamicIcon as LucideDynamicIcon, type IconName } from "lucide-react/dynamic";

interface DynamicIconProps extends LucideProps {
  name: string;
}

/**
 * Renders an icon looked up by name at runtime (e.g. from admin-editable
 * content), lazily loading it from Lucide's full icon set so any of the
 * ~1500 icons can be picked in the admin, not just a small curated list.
 * Falls back to a generic icon while loading or if the name is invalid.
 */
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  return (
    <LucideDynamicIcon
      name={name as IconName}
      fallback={() => <LayoutGrid {...props} />}
      {...props}
    />
  );
}

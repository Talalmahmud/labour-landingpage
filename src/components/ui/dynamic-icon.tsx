"use client";

import Image from "next/image";
import { LayoutGrid, type LucideProps } from "lucide-react";
import { DynamicIcon as LucideDynamicIcon, type IconName } from "lucide-react/dynamic";

import { cloudinaryUrl } from "@/lib/cloudinary-url";
import { parseCustomIconValue } from "@/lib/icon-value";
import { cn } from "@/lib/utils";

interface DynamicIconProps extends LucideProps {
  name: string;
}

/**
 * Renders an icon looked up by name at runtime (e.g. from admin-editable
 * content). Names prefixed "custom:" resolve to an admin-uploaded icon
 * image; everything else is lazily loaded from Lucide's full icon set so
 * any of the ~1500 built-in icons can be picked, not just a small curated
 * list. Falls back to a generic icon while loading or if the name is invalid.
 */
export function DynamicIcon({ name, className, ...props }: DynamicIconProps) {
  const customPublicId = parseCustomIconValue(name);

  if (customPublicId) {
    return (
      <span className={cn("relative inline-block shrink-0", className)}>
        <Image
          src={cloudinaryUrl(customPublicId, "f_auto,q_auto,w_64,h_64,c_fit")}
          alt=""
          fill
          sizes="32px"
          className="object-contain"
        />
      </span>
    );
  }

  return (
    <LucideDynamicIcon
      name={name as IconName}
      className={className}
      fallback={() => <LayoutGrid className={className} {...props} />}
      {...props}
    />
  );
}

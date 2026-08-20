import { createElement, type SVGProps } from "react";

import { getIcon } from "@/lib/icons";

interface DynamicIconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

/**
 * Renders an icon looked up by key at runtime (e.g. from admin-editable
 * content). Uses `createElement` instead of JSX so the icon isn't a
 * dynamically-assigned JSX tag — React Compiler's static analysis can't
 * see that `getIcon` just returns a stable reference from a fixed
 * registry, and flags `const Icon = getIcon(x); <Icon />` as "creating a
 * component during render" (a real anti-pattern it can't distinguish
 * this lookup from).
 */
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  return createElement(getIcon(name), props);
}

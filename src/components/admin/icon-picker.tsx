"use client";

import { useEffect, useState } from "react";
import { Combobox } from "@base-ui/react/combobox";
import { ChevronDownIcon } from "lucide-react";

import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { CustomIconDTO } from "@/lib/custom-icons";
import { parseCustomIconValue, toCustomIconValue } from "@/lib/icon-value";
import { iconNames } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [customIcons, setCustomIcons] = useState<CustomIconDTO[]>([]);

  useEffect(() => {
    fetch("/api/custom-icons")
      .then((res) => (res.ok ? res.json() : []))
      .then(setCustomIcons)
      .catch(() => {});
  }, []);

  const labelByValue = new Map<string, string>();
  for (const icon of customIcons) {
    labelByValue.set(toCustomIconValue(icon.imagePublicId), icon.name);
  }

  const items = [...customIcons.map((icon) => toCustomIconValue(icon.imagePublicId)), ...iconNames];

  function filterIcon(itemValue: string, query: string): boolean {
    const label = labelByValue.get(itemValue) ?? itemValue;
    return label.toLowerCase().includes(query.trim().toLowerCase());
  }

  return (
    <Combobox.Root
      items={items}
      value={value}
      onValueChange={(v) => v && onChange(v)}
      filter={filterIcon}
      limit={60}
    >
      <Combobox.InputGroup className="relative flex items-center">
        <span className="pointer-events-none absolute left-2.5 flex items-center justify-center text-muted-foreground">
          <DynamicIcon name={value} className="size-4" />
        </span>
        <Combobox.Input
          placeholder="Search icons…"
          className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent py-1 pr-8 pl-8 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        />
        <Combobox.Trigger className="absolute right-1 flex size-7 items-center justify-center rounded text-muted-foreground hover:text-foreground">
          <ChevronDownIcon className="pointer-events-none size-4" />
        </Combobox.Trigger>
      </Combobox.InputGroup>

      <Combobox.Portal>
        <Combobox.Positioner side="bottom" sideOffset={4} align="start" className="isolate z-50">
          <Combobox.Popup className="max-h-72 w-(--anchor-width) min-w-56 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
            <Combobox.Empty className="px-2 py-4 text-center text-xs text-muted-foreground">
              No icons found.
            </Combobox.Empty>
            <Combobox.List>
              {(item: string) => (
                <Combobox.Item
                  key={item}
                  value={item}
                  className={cn(
                    "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-2 text-sm outline-hidden select-none",
                    "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
                  )}
                >
                  <DynamicIcon name={item} className="size-4 shrink-0" />
                  <span className="truncate">{labelByValue.get(item) ?? item}</span>
                  {parseCustomIconValue(item) && (
                    <span className="ml-auto shrink-0 text-[10px] text-muted-foreground">
                      custom
                    </span>
                  )}
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

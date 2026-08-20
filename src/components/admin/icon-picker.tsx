"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { iconKeys } from "@/lib/icons";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger className="w-full">
        <DynamicIcon name={value} className="size-4 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {iconKeys.map((key) => (
          <SelectItem key={key} value={key}>
            <DynamicIcon name={key} className="size-4" />
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

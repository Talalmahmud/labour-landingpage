"use client";

import type { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ArrayEditorProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
  addLabel?: string;
  minItems?: number;
}

export function ArrayEditor<T>({
  items,
  onChange,
  newItem,
  renderItem,
  addLabel = "Add item",
  minItems = 0,
}: ArrayEditorProps<T>) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={index} className="relative rounded-lg border border-border p-4 pr-11">
          {renderItem(item, (patch) => {
            onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
          })}
          {items.length > minItems && (
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              <Trash2 />
              <span className="sr-only">Remove</span>
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit gap-1.5"
        onClick={() => onChange([...items, newItem()])}
      >
        <Plus className="size-4" />
        {addLabel}
      </Button>
    </div>
  );
}

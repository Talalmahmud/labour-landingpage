"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cloudinaryUrl } from "@/lib/cloudinary-url";

interface ImageUploadFieldProps {
  value: string | null;
  onChange: (publicId: string | null) => void;
  onUploadingChange?: (uploading: boolean) => void;
}

export function ImageUploadField({ value, onChange, onUploadingChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    onUploadingChange?.(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Upload failed");
      onChange(data.publicId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {value ? (
        <div className="relative w-40 overflow-hidden rounded-lg ring-1 ring-border">
          <Image
            src={cloudinaryUrl(value, "f_auto,q_auto,w_320,h_320,c_fill,g_auto")}
            alt="Hero preview"
            width={320}
            height={320}
            className="aspect-square w-full object-cover"
          />
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="absolute top-1.5 right-1.5 bg-background/90 text-destructive hover:bg-background"
            onClick={() => onChange(null)}
          >
            <X className="size-4" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-50"
        >
          {uploading ? <Loader2 className="size-5 animate-spin" /> : <ImagePlus className="size-5" />}
          <span className="text-xs">{uploading ? "Uploading..." : "Upload image"}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">Falls back to the illustration when no image is set.</p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/admin/field";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { CustomIconDTO } from "@/lib/custom-icons";
import { toCustomIconValue } from "@/lib/icon-value";

export function IconLibraryPanel() {
  const [icons, setIcons] = useState<CustomIconDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [imagePublicId, setImagePublicId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function loadIcons() {
    fetch("/api/custom-icons")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load icon library");
        return res.json();
      })
      .then(setIcons)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load icon library"));
  }

  useEffect(loadIcons, []);

  async function handleAdd() {
    if (!name.trim() || !imagePublicId) return;
    setSaving(true);
    setFormError(null);
    try {
      const res = await fetch("/api/custom-icons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), imagePublicId }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Failed to add icon");
      setName("");
      setImagePublicId(null);
      loadIcons();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to add icon");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/custom-icons/${id}`, { method: "DELETE" });
      setIcons((prev) => prev?.filter((icon) => icon.id !== id) ?? null);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6 shadow-xs">
      <p className="text-xs text-muted-foreground">
        Upload custom icons here to make them available in every icon picker across the site —
        alongside the built-in icon set.
      </p>

      <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border p-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Field label="Icon Image">
            <ImageUploadField
              value={imagePublicId}
              onChange={setImagePublicId}
              onUploadingChange={setUploading}
              hint="Square images work best."
              previewTransform="f_auto,q_auto,w_120,h_120,c_fit"
            />
          </Field>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <Field label="Name">
            <Input
              placeholder="e.g. Company Badge"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          {formError && <p className="text-sm text-destructive">{formError}</p>}
          <Button
            type="button"
            className="w-fit gap-1.5 bg-blue-950 text-white hover:bg-blue-900"
            onClick={handleAdd}
            disabled={saving || uploading || !name.trim() || !imagePublicId}
          >
            {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Plus className="size-3.5" />}
            Add Icon
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {!error && icons === null && <p className="text-sm text-muted-foreground">Loading…</p>}
      {icons?.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No custom icons yet.
        </p>
      )}

      {icons && icons.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {icons.map((icon) => (
            <div
              key={icon.id}
              className="relative flex flex-col items-center gap-2 rounded-lg border border-border p-3 text-center"
            >
              <DynamicIcon name={toCustomIconValue(icon.imagePublicId)} className="size-8" />
              <p className="truncate text-xs font-medium text-foreground">{icon.name}</p>
              <Button
                size="icon-sm"
                variant="ghost"
                className="absolute top-1 right-1 text-destructive"
                onClick={() => handleDelete(icon.id)}
                disabled={deletingId === icon.id}
              >
                <Trash2 className="size-3.5" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

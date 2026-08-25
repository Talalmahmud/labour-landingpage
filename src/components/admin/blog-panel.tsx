"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/admin/field";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { BlogPostDTO, PostStatus } from "@/lib/posts";
import { slugify } from "@/lib/slug";

const STATUS_LABELS: Record<PostStatus, string> = { draft: "Draft", published: "Published" };

const EMPTY_FORM = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  coverImagePublicId: null as string | null,
  author: "",
  status: "draft" as PostStatus,
};

type FormState = typeof EMPTY_FORM;

export function BlogPanel() {
  const [posts, setPosts] = useState<BlogPostDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function loadPosts() {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json();
      })
      .then(setPosts)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load posts"));
  }

  useEffect(loadPosts, []);

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSlugTouched(false);
    setFormError(null);
    setDialogOpen(true);
  }

  function openEdit(post: BlogPostDTO) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: post.body,
      coverImagePublicId: post.coverImagePublicId,
      author: post.author,
      status: post.status,
    });
    setSlugTouched(true);
    setFormError(null);
    setDialogOpen(true);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      setPosts((prev) => prev?.filter((p) => p.id !== id) ?? null);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSubmit() {
    setSaving(true);
    setFormError(null);
    try {
      const res = await fetch(editingId ? `/api/posts/${editingId}` : "/api/posts", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Failed to save post");
      setDialogOpen(false);
      loadPosts();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          Blog posts shown on the public /blog page. Only &quot;Published&quot; posts are
          visible to visitors.
        </p>
        <Button size="sm" className="shrink-0 gap-1.5 bg-blue-950 text-white hover:bg-blue-900" onClick={openNew}>
          <Plus className="size-4" />
          New Post
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {!error && posts === null && <p className="text-sm text-muted-foreground">Loading…</p>}
      {posts?.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No posts yet. Create your first one.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {posts?.map((post) => (
          <div key={post.id} className="flex items-start gap-3 rounded-lg border border-border p-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-blue-950 dark:text-white">{post.title}</p>
                <span
                  className={
                    post.status === "published"
                      ? "rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                  }
                >
                  {STATUS_LABELS[post.status]}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                /blog/{post.slug} · {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post.excerpt && <p className="mt-1 text-sm text-foreground">{post.excerpt}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button size="icon-sm" variant="ghost" onClick={() => openEdit(post)}>
                <Pencil className="size-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                size="icon-sm"
                variant="ghost"
                className="text-destructive"
                onClick={() => handleDelete(post.id)}
                disabled={deletingId === post.id}
              >
                <Trash2 className="size-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Post" : "New Post"}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Field label="Cover Image">
              <ImageUploadField
                value={form.coverImagePublicId}
                onChange={(coverImagePublicId) => setForm((f) => ({ ...f, coverImagePublicId }))}
                onUploadingChange={setUploading}
                hint="Shown on the blog listing and post page."
                previewTransform="f_auto,q_auto,w_480,h_270,c_fill,g_auto"
              />
            </Field>

            <Field label="Title">
              <Input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: slugTouched ? f.slug : slugify(title),
                  }));
                }}
              />
            </Field>

            <Field label="Slug">
              <Input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
                }}
              />
            </Field>

            <Field label="Excerpt">
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="min-h-16 resize-none"
              />
            </Field>

            <Field label="Body">
              <RichTextEditor
                value={form.body}
                onChange={(body) => setForm((f) => ({ ...f, body }))}
                placeholder="Write the post content…"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Author">
                <Input
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                />
              </Field>
              <Field label="Status">
                <Select
                  value={form.status}
                  onValueChange={(v) => v && setForm((f) => ({ ...f, status: v as PostStatus }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{(v: PostStatus) => STATUS_LABELS[v] ?? v}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {formError && <p className="text-sm text-destructive">{formError}</p>}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="gap-1.5 bg-blue-950 text-white hover:bg-blue-900"
              onClick={handleSubmit}
              disabled={saving || uploading || !form.title}
            >
              {saving && <Loader2 className="size-3.5 animate-spin" />}
              {editingId ? "Save Changes" : "Create Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";
import { slugify } from "@/lib/slug";

export { slugify };

const COLLECTION = "posts";

export type PostStatus = "draft" | "published";

export interface BlogPost {
  _id: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImagePublicId: string | null;
  author: string;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostDTO {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImagePublicId: string | null;
  author: string;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PostInput {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImagePublicId: string | null;
  author: string;
  status: PostStatus;
}

function toDTO(doc: BlogPost): BlogPostDTO {
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    body: doc.body,
    coverImagePublicId: doc.coverImagePublicId,
    author: doc.author,
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export async function listAllPosts(): Promise<BlogPostDTO[]> {
  const db = await getDb();
  const docs = await db
    .collection<BlogPost>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .limit(500)
    .toArray();
  return docs.map(toDTO);
}

export async function listPublishedPosts(): Promise<BlogPostDTO[]> {
  const db = await getDb();
  const docs = await db
    .collection<BlogPost>(COLLECTION)
    .find({ status: "published" })
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();
  return docs.map(toDTO);
}

export async function getPostById(id: string): Promise<BlogPostDTO | null> {
  const db = await getDb();
  const doc = await db.collection<BlogPost>(COLLECTION).findOne({ _id: new ObjectId(id) });
  return doc ? toDTO(doc) : null;
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPostDTO | null> {
  const db = await getDb();
  const doc = await db.collection<BlogPost>(COLLECTION).findOne({ slug, status: "published" });
  return doc ? toDTO(doc) : null;
}

async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const db = await getDb();
  const filter: Record<string, unknown> = { slug };
  if (excludeId) filter._id = { $ne: new ObjectId(excludeId) };
  const existing = await db.collection<BlogPost>(COLLECTION).findOne(filter);
  return existing !== null;
}

export async function createPost(input: PostInput): Promise<{ id: string } | { error: string }> {
  if (await isSlugTaken(input.slug)) {
    return { error: "A post with this slug already exists" };
  }
  const db = await getDb();
  const now = new Date();
  const result = await db.collection<Omit<BlogPost, "_id">>(COLLECTION).insertOne({
    ...input,
    createdAt: now,
    updatedAt: now,
  });
  return { id: result.insertedId.toString() };
}

export async function updatePost(
  id: string,
  input: PostInput,
): Promise<{ ok: true } | { error: string }> {
  if (await isSlugTaken(input.slug, id)) {
    return { error: "A post with this slug already exists" };
  }
  const db = await getDb();
  await db.collection<BlogPost>(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
  );
  return { ok: true };
}

export async function deletePost(id: string): Promise<void> {
  const db = await getDb();
  await db.collection<BlogPost>(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

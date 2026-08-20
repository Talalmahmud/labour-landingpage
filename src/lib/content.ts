import { getDb } from "@/lib/mongodb";
import { defaultContent } from "@/lib/content-seed";
import type { SiteContent } from "@/lib/content-types";

const DOC_ID = "site";
const COLLECTION = "content";

interface ContentDoc extends SiteContent {
  _id: string;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Recursively fills in any keys present in `defaults` but missing (or
 * `undefined`) in `existing`. Arrays and primitives from `existing` are
 * kept as-is — only plain objects are merged deeper. This lets us evolve
 * the content schema (new fields, new nested sections) without a manual
 * migration for every document already sitting in Mongo.
 */
function fillMissing<T>(existing: unknown, defaults: T): T {
  if (!isPlainObject(existing)) return defaults;
  if (!isPlainObject(defaults)) return existing as T;

  const result: Record<string, unknown> = { ...existing };
  for (const key of Object.keys(defaults)) {
    const defaultValue = (defaults as Record<string, unknown>)[key];
    if (!(key in existing) || existing[key] === undefined) {
      result[key] = defaultValue;
    } else if (isPlainObject(defaultValue)) {
      result[key] = fillMissing(existing[key], defaultValue);
    }
  }
  return result as T;
}

export async function getContent(): Promise<SiteContent> {
  const db = await getDb();
  const collection = db.collection<ContentDoc>(COLLECTION);

  const existing = await collection.findOne({ _id: DOC_ID });
  if (existing) {
    const { _id, ...content } = existing;
    void _id;

    const merged = fillMissing<SiteContent>(content, defaultContent);
    if (JSON.stringify(merged) !== JSON.stringify(content)) {
      await collection.updateOne({ _id: DOC_ID }, { $set: { ...merged } });
    }
    return merged;
  }

  await collection.insertOne({ _id: DOC_ID, ...defaultContent });
  return defaultContent;
}

export async function updateContent(content: SiteContent): Promise<void> {
  const db = await getDb();
  const collection = db.collection<ContentDoc>(COLLECTION);
  await collection.updateOne(
    { _id: DOC_ID },
    { $set: { ...content } },
    { upsert: true }
  );
}

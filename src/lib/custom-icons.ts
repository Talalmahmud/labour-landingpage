import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";

const COLLECTION = "customIcons";

export interface CustomIcon {
  _id: ObjectId;
  name: string;
  imagePublicId: string;
  createdAt: Date;
}

export interface CustomIconDTO {
  id: string;
  name: string;
  imagePublicId: string;
  createdAt: string;
}

function toDTO(doc: CustomIcon): CustomIconDTO {
  return {
    id: doc._id.toString(),
    name: doc.name,
    imagePublicId: doc.imagePublicId,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function createCustomIcon(input: {
  name: string;
  imagePublicId: string;
}): Promise<void> {
  const db = await getDb();
  await db.collection<Omit<CustomIcon, "_id">>(COLLECTION).insertOne({
    ...input,
    createdAt: new Date(),
  });
}

export async function listCustomIcons(): Promise<CustomIconDTO[]> {
  const db = await getDb();
  const docs = await db
    .collection<CustomIcon>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .limit(500)
    .toArray();
  return docs.map(toDTO);
}

export async function deleteCustomIcon(id: string): Promise<void> {
  const db = await getDb();
  await db.collection<CustomIcon>(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

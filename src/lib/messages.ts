import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";

const COLLECTION = "messages";

export interface ContactMessage {
  _id: ObjectId;
  name: string;
  contact: string;
  message: string;
  createdAt: Date;
}

export interface ContactMessageDTO {
  id: string;
  name: string;
  contact: string;
  message: string;
  createdAt: string;
}

function toDTO(doc: ContactMessage): ContactMessageDTO {
  return {
    id: doc._id.toString(),
    name: doc.name,
    contact: doc.contact,
    message: doc.message,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function createMessage(input: {
  name: string;
  contact: string;
  message: string;
}): Promise<void> {
  const db = await getDb();
  await db.collection<Omit<ContactMessage, "_id">>(COLLECTION).insertOne({
    name: input.name,
    contact: input.contact,
    message: input.message,
    createdAt: new Date(),
  });
}

export async function listMessages(): Promise<ContactMessageDTO[]> {
  const db = await getDb();
  const docs = await db
    .collection<ContactMessage>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();
  return docs.map(toDTO);
}

export async function deleteMessage(id: string): Promise<void> {
  const db = await getDb();
  await db.collection<ContactMessage>(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

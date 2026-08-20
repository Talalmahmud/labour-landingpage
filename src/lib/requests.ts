import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";

const COLLECTION = "requests";

export interface LabourRequest {
  _id: ObjectId;
  name: string;
  phone: string;
  service: string;
  location: string;
  date: string;
  details: string;
  createdAt: Date;
}

export interface LabourRequestDTO {
  id: string;
  name: string;
  phone: string;
  service: string;
  location: string;
  date: string;
  details: string;
  createdAt: string;
}

function toDTO(doc: LabourRequest): LabourRequestDTO {
  return {
    id: doc._id.toString(),
    name: doc.name,
    phone: doc.phone,
    service: doc.service,
    location: doc.location,
    date: doc.date,
    details: doc.details,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function createRequest(input: {
  name: string;
  phone: string;
  service: string;
  location: string;
  date: string;
  details: string;
}): Promise<void> {
  const db = await getDb();
  await db.collection<Omit<LabourRequest, "_id">>(COLLECTION).insertOne({
    ...input,
    createdAt: new Date(),
  });
}

export async function listRequests(): Promise<LabourRequestDTO[]> {
  const db = await getDb();
  const docs = await db
    .collection<LabourRequest>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();
  return docs.map(toDTO);
}

export async function deleteRequest(id: string): Promise<void> {
  const db = await getDb();
  await db.collection<LabourRequest>(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

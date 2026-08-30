import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongodb";

const COLLECTION = "workerApplications";

export interface WorkerApplication {
  _id: ObjectId;
  name: string;
  phone: string;
  service: string;
  location: string;
  experience: string;
  details: string;
  createdAt: Date;
}

export interface WorkerApplicationDTO {
  id: string;
  name: string;
  phone: string;
  service: string;
  location: string;
  experience: string;
  details: string;
  createdAt: string;
}

function toDTO(doc: WorkerApplication): WorkerApplicationDTO {
  return {
    id: doc._id.toString(),
    name: doc.name,
    phone: doc.phone,
    service: doc.service,
    location: doc.location,
    experience: doc.experience,
    details: doc.details,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function createWorkerApplication(input: {
  name: string;
  phone: string;
  service: string;
  location: string;
  experience: string;
  details: string;
}): Promise<void> {
  const db = await getDb();
  await db.collection<Omit<WorkerApplication, "_id">>(COLLECTION).insertOne({
    ...input,
    createdAt: new Date(),
  });
}

export async function listWorkerApplications(): Promise<WorkerApplicationDTO[]> {
  const db = await getDb();
  const docs = await db
    .collection<WorkerApplication>(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();
  return docs.map(toDTO);
}

export async function deleteWorkerApplication(id: string): Promise<void> {
  const db = await getDb();
  await db.collection<WorkerApplication>(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

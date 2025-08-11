import { db } from "../index.js";
import { NewChirp, chirps } from "../schema.js"
import { eq } from "drizzle-orm";

export async function createChirp(chirp: NewChirp){
  const [result] = await db
    .insert(chirps)
    .values(chirp)
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function getAllChirps() {
  return db
    .select()
    .from(chirps)
    .orderBy(chirps.createdAt);
}

export async function getChirp(chirpID: string) {
  const [result] = await db
    .select()
    .from(chirps)
    .where(eq(chirps.id, chirpID));

  return result;
}
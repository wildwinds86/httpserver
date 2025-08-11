import { db } from "../index.js";
import { chirps } from "../schema.js";
import { eq } from "drizzle-orm";
export async function createChirp(chirp) {
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
export async function getChirp(chirpID) {
    const [result] = await db
        .select()
        .from(chirps)
        .where(eq(chirps.id, chirpID));
    return result;
}

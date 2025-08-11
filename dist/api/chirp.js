import { respondWithJSON } from "./json.js";
import { ErrorBadRequest } from "./errors.js";
import { createChirp, getAllChirps, getChirp } from "../db/queries/chirps.js";
export async function handlerCreateChirp(req, res) {
    const params = req.body;
    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
        throw new ErrorBadRequest("Chirp is too long. Max length is 140");
    }
    /*if (params.userId.length === 0) {
      throw new ErrorBadRequest("Missing User ID");
    }
  */
    const words = params.body.split(" ");
    const badWords = ["kerfuffle", "sharbert", "fornax"];
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const loweredWord = word.toLowerCase();
        if (badWords.includes(loweredWord)) {
            words[i] = "****";
        }
    }
    const cleaned = words.join(" ");
    const chirp = await createChirp({ body: cleaned, user_id: params.userId });
    respondWithJSON(res, 201, {
        id: chirp.id,
        createdAt: chirp.createdAt,
        updatedAt: chirp.updatedAt,
        body: chirp.body,
        userId: chirp.user_id
    });
}
export async function handlerGetChirps(req, res) {
    const chirps = await getAllChirps();
    respondWithJSON(res, 200, chirps);
}
export async function handlerGetSingleChirp(req, res) {
    const chirp = await getChirp(req.params.chirpID);
    respondWithJSON(res, 200, {
        id: chirp.id,
        createdAt: chirp.createdAt,
        updatedAt: chirp.updatedAt,
        body: chirp.body,
        userId: chirp.user_id
    });
}

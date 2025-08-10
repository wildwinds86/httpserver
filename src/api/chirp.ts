import type { Request, Response } from "express";
import { respondWithJSON } from "./json.js";
import { ErrorBadRequest } from "./errors.js";
import { createChirp } from "../db/queries/chirps.js"

export async function handlerCreateChirp(req: Request, res: Response) {
  type parameters = {
    body: string,
    userId: string,
  };

  const params: parameters = req.body;

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

  const chirp = await createChirp({body: cleaned, user_id: params.userId });

  respondWithJSON(res, 201, {
    id: chirp.id,
    createdAt: chirp.createdAt,
    updatedAt: chirp.updatedAt,
    body: chirp.body,
    userId: chirp.user_id
  })

}
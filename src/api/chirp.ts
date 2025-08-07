import type { Request, Response } from "express";
import { respondWithJSON } from "./json.js";
import { ErrorBadRequest } from "./errors.js";

export async function handlerValidateChirp(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  const maxChirpLength = 140;
  if (params.body.length > maxChirpLength) {
    throw new ErrorBadRequest("Chirp is too long. Max length is 140");
  }

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

  respondWithJSON(res, 200, {
    cleanedBody: cleaned,
  });
}
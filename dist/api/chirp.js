import { respondWithJSON } from "./json.js";
export async function handlerValidateChirp(req, res) {
    const params = req.body;
    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
        throw new Error("Chirp is too long");
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

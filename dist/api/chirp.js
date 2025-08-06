import { respondWithJSON, respondWithError } from "./json.js";
export async function handlerValidateChirp(req, res) {
    const params = req.body;
    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
        respondWithError(res, 400, "Chirp is too long");
        return;
    }
    respondWithJSON(res, 200, {
        valid: true,
    });
}

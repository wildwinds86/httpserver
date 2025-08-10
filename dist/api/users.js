import { createUser } from "../db/queries/users.js";
import { ErrorBadRequest } from "./errors.js";
import { respondWithJSON } from "./json.js";
export async function handlerUsersCreate(req, res) {
    const params = req.body;
    if (!params.email) {
        throw new ErrorBadRequest("Missing required fields");
    }
    const user = await createUser({ email: params.email });
    if (!user) {
        throw new Error("Could not create user");
    }
    respondWithJSON(res, 201, {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
}

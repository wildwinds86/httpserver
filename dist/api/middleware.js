import { config } from "../config.js";
import { respondWithError } from "./json.js";
import { ErrorBadRequest, ErrorForbidden, ErrorNotFound, ErrorUnauthorised } from "./errors.js";
export function middlewareLogResponses(req, res, next) {
    res.on("finish", () => {
        const status = res.statusCode;
        if (status < 200 || status >= 300) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`);
        }
    });
    next();
}
export function middlewareMetricsInc(req, res, next) {
    res.on("finish", () => {
        config.fileServerHits++;
    });
    next();
}
export function middlewareErrorHandler(err, req, res, next) {
    let statusCode = 500;
    if (err instanceof ErrorBadRequest) {
        statusCode = 400;
    }
    if (err instanceof ErrorUnauthorised) {
        statusCode = 401;
    }
    if (err instanceof ErrorForbidden) {
        statusCode = 403;
    }
    if (err instanceof ErrorNotFound) {
        statusCode = 404;
    }
    console.error(err.message);
    respondWithError(res, statusCode, err.message);
}

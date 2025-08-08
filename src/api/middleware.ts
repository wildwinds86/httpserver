import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";
import { respondWithJSON, respondWithError } from "./json.js";
import { ErrorBadRequest, ErrorForbidden, ErrorNotFound, ErrorUnauthorised } from "./errors.js";

export function middlewareLogResponses(req: Request, res: Response, next: NextFunction) {
  (res as any).on("finish", () => {
    const status = (res as any).statusCode;
    if (status < 200 || status >= 300) {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`)
    }
  });
  next();
}

export function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
  (res as any).on("finish", () => {
    config.api.fileServerHits++;
  });
  next();
}

export function middlewareErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  let statusCode: number = 500;

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
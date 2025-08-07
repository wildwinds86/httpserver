import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";
import { respondWithJSON, respondWithError } from "./json.js";

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
    config.fileServerHits++;
  });
  next();
}

export function middlewareErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const statusCode: number = 500;
  const errorMessage: string = "Something went wrong on our end";
  
  console.error(err.message);
  respondWithError(res, statusCode, errorMessage);
}
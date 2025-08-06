import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

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
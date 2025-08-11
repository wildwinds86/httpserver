import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";
//import { deleteAllUsers } from "../db/queries/users.js"
import { ErrorForbidden } from "./errors.js";
import { reset } from "../db/queries/users.js";

export async function handlerMetrics(_: Request, res: Response) {
  let htmlString = `<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.api.fileServerHits} times!</p>
  </body>
</html>`
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.send(htmlString);
  res.end();
}

export async function handlerReset(_: Request, res: Response) {
  if (config.api.platform !== "dev") {
    console.log(config.api.platform);
    throw new ErrorForbidden("Reset is only allowed in dev environment.");
  }
  config.api.fileServerHits = 0;
  await reset();

  res.write("Hits reset to 0");
  res.end();
}
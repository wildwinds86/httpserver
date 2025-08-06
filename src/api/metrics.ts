import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handlerMetrics(_: Request, res: Response) {
    let htmlString = `<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.fileServerHits} times!</p>
  </body>
</html>`
    res.set({ "Content-Type": "text/html; charset=utf-8" });
    res.send(htmlString);
    res.end();
}

export async function handlerReset(_: Request, res: Response) {
    res.set({ "Content-Type": "text/plain; charset=utf-8" });
    res.send(`Hits reset to zero`);
    config.fileServerHits = 0;
}
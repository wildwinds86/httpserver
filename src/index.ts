import express from "express";
//import path from "path";
import {handlerMetrics, handlerReset} from "./api/metrics.js"
import {
  middlewareLogResponses,
  middlewareMetricsInc,
} from "./api/middleware.js";
import {handlerReadiness} from "./api/readiness.js"
import {handlerValidateChirp} from "./api/chirp.js"

const app = express();
const PORT = 8080;

app.use(middlewareLogResponses);

app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.use(express.json());

app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", handlerReset);
app.post("/api/validate_chirp", handlerValidateChirp);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
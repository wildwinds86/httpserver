import express from "express";
//import path from "path";
import {handlerMetrics, handlerReset} from "./api/metrics.js"
import {
  middlewareLogResponses,
  middlewareMetricsInc,
} from "./api/middleware.js";
import {handlerReadiness} from "./api/readiness.js"

const app = express();
const PORT = 8080;

app.use(middlewareLogResponses);

app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", handlerReset);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
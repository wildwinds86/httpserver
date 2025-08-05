import express from "express";
const app = express();
const PORT = 8080;
app.use("/app", express.static("./src/app"));
app.use(middlewareLogResponses);
app.get("/healthz", (req, res) => {
    res.set({ "Content-Type": "text/plain; charset=utf-8" });
    res.send("OK");
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
function middlewareLogResponses(req, res, next) {
    res.on("finish", () => {
        const status = res.statusCode;
        if (status < 200 || status >= 300) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`);
        }
    });
    next();
}

process.loadEnvFile();
export const config = {
    fileServerHits: 0,
    dbURL: String(process.env.DB_URL),
};
export const errorMsgs = {
    genericErrorMessage: "Something went wrong on our end",
};

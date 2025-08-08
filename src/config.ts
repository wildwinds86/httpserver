process.loadEnvFile();

type APIConfig = {
    fileServerHits: number;
    dbURL: string;
};

export const config: APIConfig = {
    fileServerHits: 0,
    dbURL: String(process.env.DB_URL),
}

export const errorMsgs = {
    genericErrorMessage: "Something went wrong on our end",
}
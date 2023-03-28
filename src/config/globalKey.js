import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const URL_DATABASE_PRODUCT = process.env.URL_DATABASE_PRODUCT || "";
const URL_DATABASE_DEV = process.env.URL_DATABASE_DEV || "";
const SECRET_KEY = process.env.SECRET_KEY;
export { PORT, URL_DATABASE_PRODUCT, URL_DATABASE_DEV,SECRET_KEY };

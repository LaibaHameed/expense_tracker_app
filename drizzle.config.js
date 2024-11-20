import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./utils/schema.js",
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_URL,
    },
});

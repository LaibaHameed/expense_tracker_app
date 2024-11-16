import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./utils/schema.jsx",
    driver: "pglite",
    dbCredentials: {
        url: DATABASE_URL,
    }
});

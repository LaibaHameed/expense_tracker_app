import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./utils/schema.jsx",
    // driver: "postgresql", // Replace "pg" with the correct driver name
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_URL,
    },
});

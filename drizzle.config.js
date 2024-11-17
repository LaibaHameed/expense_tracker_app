import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./utils/schema.js",
    dbCredentials: {
        // url: process.env.NEXT_PUBLIC_DATABASE_URL,
        url: 'postgresql://ExpenseFlow_owner:t71UnSzrRmMd@ep-lucky-surf-a560cl7k.us-east-2.aws.neon.tech/ExpenseFlow?sslmode=require',
    },
});

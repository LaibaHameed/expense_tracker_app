import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

// const sql = neon('postgresql://ExpenseFlow_owner:t71UnSzrRmMd@ep-lucky-surf-a560cl7k.us-east-2.aws.neon.tech/ExpenseFlow?sslmode=require',);
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL,);
const db = drizzle({ client: sql },{schema});
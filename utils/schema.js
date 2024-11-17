import { integer, pgTable, serial, varchar, numeric } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull().unique(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(), // Changed to numeric
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull()
});

export const Expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(), // Changed to numeric
    budgetId: integer('budgetId').references(() => Budgets.id),
    createdBy: varchar('createdBy').notNull()
});

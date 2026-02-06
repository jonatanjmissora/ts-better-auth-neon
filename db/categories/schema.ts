import { pgTable, serial, text } from "drizzle-orm/pg-core"

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
})

export type CategoryType = typeof categories.$inferSelect
export type NewCategoryType = typeof categories.$inferInsert

import { user } from "db/users/schema"
import { integer, pgTable, text } from "drizzle-orm/pg-core"

export const categories = pgTable("categories", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	price: integer("price").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
})

export type CategoryType = typeof categories.$inferSelect
export type NewCategoryType = typeof categories.$inferInsert

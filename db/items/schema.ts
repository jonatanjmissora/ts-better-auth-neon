import {
	pgTable,
	text,
	integer,
	bigint,
	index,
	serial,
} from "drizzle-orm/pg-core"
import { user } from "../users/schema"

export const items = pgTable(
	"items",
	{
		id: text("id").primaryKey(),

		date: bigint("date", { mode: "number" }).notNull(),

		name: text("name").notNull(),

		phone: bigint("phone", { mode: "number" }),

		categoryId: integer("category_id")
			.notNull()
			.references(() => categories.id, {
				onDelete: "restrict", // o "cascade" según tu caso
			}),

		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	table => ({
		userDateIdx: index("items_user_date_idx").on(table.userId, table.date),
	})
)

export type Item = typeof items.$inferSelect
export type NewItemType = typeof items.$inferInsert

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
})

export type CategoryType = typeof categories.$inferSelect
export type NewCategoryType = typeof categories.$inferInsert

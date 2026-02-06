import { pgTable, text, integer, index, bigint } from "drizzle-orm/pg-core"
import { user } from "../users/schema"
import { categories } from "db/categories/schema"

export const items = pgTable(
	"items",
	{
		id: text("id").primaryKey(),

		date: bigint("date", { mode: "number" }).notNull(),

		phone: bigint("phone", { mode: "number" }).notNull(),

		name: text("name").notNull(),

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

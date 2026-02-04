import { pgTable, text, integer, bigint, index } from "drizzle-orm/pg-core"
import { user } from "../users/schema"
import { z } from "zod"

export const items = pgTable(
	"items",
	{
		id: text("id").primaryKey(),

		date: bigint("date", { mode: "number" }).notNull(),

		name: text("name").notNull(),

		phone: bigint("phone", { mode: "number" }),

		categoryId: integer("category_id").notNull(),

		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	table => ({
		userDateIdx: index("items_user_date_idx").on(table.userId, table.date),
	})
)

export type Item = typeof items.$inferSelect
export type NewItem = typeof items.$inferInsert

export const itemSchema = z.object({
	name: z.string().min(1),
	date: z.number(),
	phone: z.number().optional(),
	categoryId: z.number(),
})

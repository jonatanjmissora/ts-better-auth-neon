import { db } from "db/drizzle"
import { items } from "./schema"
import { eq, and } from "drizzle-orm"
import { delay } from "lib/utils"
import { categories } from "../categories/schema"

export async function getItemByIdDB(itemId: string, userId: string) {
	await delay()
	return await db
		.select({
			id: items.id,
			name: items.name,
			phone: items.phone,
			date: items.date,
			category: {
				id: categories.id,
				name: categories.name,
			},
			userId: items.userId,
		})
		.from(items)
		.innerJoin(categories, eq(items.categoryId, categories.id))
		.where(and(eq(items.id, itemId), eq(items.userId, userId)))
		.limit(1)
		.then(rows => rows[0] ?? null)
}

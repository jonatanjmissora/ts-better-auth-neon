import { db } from "db/drizzle"
import { categories } from "./schema"
import { eq, and } from "drizzle-orm"
import { delay } from "lib/utils"

export async function getCategoryByIdDB(categoryId: string, userId: string) {
	await delay()
	return await db
		.select({
			id: categories.id,
			name: categories.name,
			price: categories.price,
			userId: categories.userId,
		})
		.from(categories)
		.where(and(eq(categories.id, categoryId), eq(categories.userId, userId)))
		.limit(1)
		.then(rows => rows[0] ?? null)
}

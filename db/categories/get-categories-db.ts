import { db } from "db/drizzle"
import { categories } from "./schema"
import { eq } from "drizzle-orm"
import { delay } from "lib/utils"

export async function getCategoriesDB(userId: string) {
	await delay()
	return db
		.select({
			id: categories.id,
			name: categories.name,
			price: categories.price,
			userId: categories.userId,
		})
		.from(categories)
		.orderBy(categories.name)
		.where(eq(categories.userId, userId))
}

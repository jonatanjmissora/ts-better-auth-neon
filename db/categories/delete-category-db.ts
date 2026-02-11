import { db } from "db/drizzle"
import { delay } from "lib/utils"
import { eq } from "drizzle-orm"
import { categories } from "./schema"

export async function deleteCategoryDB(categoryId: string) {
	await delay()
	return await db
		.delete(categories)
		.where(eq(categories.id, categoryId))
		.returning()
}
